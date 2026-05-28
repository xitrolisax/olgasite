const TOKEN = process.env.AIRTABLE_API_KEY;
const BASE_ID = process.env.AIRTABLE_BASE_ID;
const TABLE = process.env.AIRTABLE_TABLE_NAME ?? 'Syntria CRM';

type ClientInput = {
  name: string;
  email: string;
  company?: string;
  projectType?: string;
  message?: string;
  source: 'Contact form' | 'Cal.com booking';
  meetingAt?: string;
};

export async function createAirtableClient(input: ClientInput): Promise<void> {
  if (!TOKEN || !BASE_ID) {
    console.warn(
      '[airtable] Skipping — missing AIRTABLE_API_KEY or AIRTABLE_BASE_ID'
    );
    return;
  }

  const fields: Record<string, unknown> = {
    'Representative Name': input.name,
    'Representative Contact': input.email,
  };
  if (input.company) fields['Company Name'] = input.company;

  // Roll everything else into Notes — your schema doesn't have separate
  // fields for source / project type / meeting time.
  const notesLines: string[] = [`Source: ${input.source}`];
  if (input.projectType) notesLines.push(`Project type: ${input.projectType}`);
  if (input.meetingAt) notesLines.push(`Meeting: ${input.meetingAt}`);
  if (input.message) {
    notesLines.push('');
    notesLines.push(input.message);
  }
  fields.Notes = notesLines.join('\n');

  const url = `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(
    TABLE
  )}`;

  console.log('[airtable] Inserting record:', {
    table: TABLE,
    source: input.source,
    email: input.email,
  });

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields,
        typecast: true,
      }),
    });

    const responseText = await res.text().catch(() => '');

    if (!res.ok) {
      console.error('[airtable] Insert failed:', res.status, responseText);
      return;
    }

    console.log('[airtable] Insert OK:', responseText.slice(0, 200));
  } catch (e) {
    console.error('[airtable] Insert error:', e);
  }
}
