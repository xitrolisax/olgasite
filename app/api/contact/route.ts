import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createAirtableClient } from '@/lib/airtable';

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? 'olga@syntria.io';
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? 'onboarding@resend.dev';
const CC_EMAILS = (process.env.CONTACT_CC_EMAIL ?? '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: 'Email service is not configured.' },
      { status: 500 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const name = String(body.name ?? '').trim();
  const email = String(body.email ?? '').trim();
  const company = String(body.company ?? '').trim();
  const projectType = String(body.projectType ?? '').trim();
  const message = String(body.message ?? '').trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'Please fill in your name, email, and a message.' },
      { status: 400 }
    );
  }
  if (!emailRe.test(email)) {
    return NextResponse.json({ error: 'That email looks invalid.' }, { status: 400 });
  }
  if (message.length > 5000 || name.length > 200) {
    return NextResponse.json({ error: 'Message is too long.' }, { status: 400 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const text = [
    `From: ${name} <${email}>`,
    company ? `Company: ${company}` : null,
    projectType ? `Project type: ${projectType}` : null,
    '',
    message,
  ]
    .filter((line) => line !== null)
    .join('\n');

  try {
    const { error } = await resend.emails.send({
      from: `Olga Fredrick Site <${FROM_EMAIL}>`,
      to: [TO_EMAIL],
      cc: CC_EMAILS.length > 0 ? CC_EMAILS : undefined,
      replyTo: email,
      subject: `New inquiry from ${name}`,
      text,
    });

    if (error) {
      console.error('[contact] Resend error:', error);
      return NextResponse.json(
        { error: 'Could not send your message. Please try again.' },
        { status: 502 }
      );
    }

    // Push lead into Airtable CRM. Await so the API route doesn't return
    // before the request completes (dangling promises get cancelled in
    // serverless runtimes). Don't fail the user-facing response if Airtable
    // is down — the email already sent successfully.
    try {
      await createAirtableClient({
        name,
        email,
        company: company || undefined,
        projectType: projectType || undefined,
        message,
        source: 'Contact form',
      });
    } catch (e) {
      console.error('[contact] Airtable error:', e);
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('[contact] Unexpected error:', e);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
