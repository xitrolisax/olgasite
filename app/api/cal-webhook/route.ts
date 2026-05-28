import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createAirtableClient } from '@/lib/airtable';

const SECRET = process.env.CAL_WEBHOOK_SECRET;
const IS_PROD = process.env.NODE_ENV === 'production';

function verifySignature(rawBody: string, signatureHeader: string | null): boolean {
  if (!SECRET) {
    if (IS_PROD) {
      console.error('[cal-webhook] CAL_WEBHOOK_SECRET not set in production — refusing');
      return false;
    }
    return true; // dev only
  }
  if (!signatureHeader) return false;
  try {
    const expected = crypto
      .createHmac('sha256', SECRET)
      .update(rawBody)
      .digest('hex');
    const a = Buffer.from(expected);
    const b = Buffer.from(signatureHeader);
    if (a.length !== b.length) return false;
    return crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

function safe(value: unknown): string {
  if (typeof value === 'string') return value.trim();
  if (typeof value === 'number') return String(value);
  if (value && typeof value === 'object') {
    const obj = value as Record<string, unknown>;
    if (typeof obj.value === 'string') return obj.value.trim();
    if (typeof obj.email === 'string') return obj.email.trim();
    if (typeof obj.name === 'string') return obj.name.trim();
  }
  return '';
}

export async function POST(req: Request) {
  const rawBody = await req.text();

  if (!verifySignature(rawBody, req.headers.get('x-cal-signature-256'))) {
    console.warn('[cal-webhook] Invalid signature');
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const triggerEvent = String(body.triggerEvent ?? '');
  if (!IS_PROD) {
    console.log('[cal-webhook] Event:', triggerEvent);
    console.log('[cal-webhook] Raw payload:', rawBody.slice(0, 2500));
  }

  if (triggerEvent !== 'BOOKING_CREATED') {
    return NextResponse.json({ ok: true, ignored: triggerEvent });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = (body.payload ?? {}) as any;
  const attendee = Array.isArray(data.attendees) ? data.attendees[0] ?? {} : {};
  const responses = (data.responses ?? {}) as Record<string, unknown>;
  const userFields = (data.userFieldsResponses ?? {}) as Record<string, unknown>;

  const name =
    safe(attendee.name) ||
    safe(responses.name) ||
    safe(userFields.name) ||
    safe(responses.fullName) ||
    '';

  const email =
    safe(attendee.email) ||
    safe(responses.email) ||
    safe(userFields.email) ||
    '';

  const notes =
    safe(responses.notes) ||
    safe(userFields.notes) ||
    safe(data.additionalNotes) ||
    safe(data.description) ||
    '';

  if (!IS_PROD) {
    console.log('[cal-webhook] Extracted:', { name, email, notesLen: notes.length });
  }

  if (!email && !name) {
    console.warn('[cal-webhook] No name or email in payload — skipping');
    return NextResponse.json({ ok: true, skipped: 'no identity' });
  }

  await createAirtableClient({
    name: name || '(unnamed)',
    email: email || '(no email)',
    message: notes,
    source: 'Cal.com booking',
    meetingAt: safe(data.startTime) || safe(data.start),
  });

  return NextResponse.json({ ok: true });
}
