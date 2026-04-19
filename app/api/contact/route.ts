import { NextResponse } from 'next/server';

interface ContactPayload {
  name?: string;
  phone?: string;
  email?: string;
  website?: string;
  projectType?: string;
  projectTypeLabel?: string;
  budget?: string;
  budgetLabel?: string;
  goal?: string;
  deadline?: string;
  deadlineLabel?: string;
  comments?: string;
  source?: string;
  timestamp?: string;
}

const NOTION_API = 'https://api.notion.com/v1/pages';
const NOTION_VERSION = '2022-06-28';

const richText = (text: string) =>
  text ? [{ type: 'text', text: { content: text.slice(0, 2000) } }] : [];

export async function POST(request: Request) {
  let data: ContactPayload;
  try {
    data = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (!data.email || !data.website || !data.projectType || !data.goal) {
    return NextResponse.json(
      { error: 'Missing required fields: email, website, projectType, goal' },
      { status: 400 }
    );
  }

  const notionToken = process.env.NOTION_TOKEN;
  const notionDatabaseId = process.env.NOTION_DATABASE_ID;

  if (!notionToken || !notionDatabaseId) {
    console.error('[api/contact] Missing NOTION_TOKEN or NOTION_DATABASE_ID');
    return NextResponse.json(
      { error: 'Server not configured' },
      { status: 500 }
    );
  }

  const titleText = data.name?.trim() || data.email;

  const properties: Record<string, unknown> = {
    Name: { title: [{ text: { content: titleText } }] },
    Email: { email: data.email },
    Website: { url: data.website },
    ProjectType: { select: { name: data.projectTypeLabel || data.projectType } },
    Goal: { rich_text: richText(data.goal) },
    Status: { select: { name: 'Nuevo' } },
    Source: { select: { name: 'Web' } },
  };

  if (data.phone) {
    properties.Phone = { phone_number: data.phone };
  }
  if (data.budgetLabel) {
    properties.Budget = { select: { name: data.budgetLabel } };
  }
  if (data.deadlineLabel) {
    properties.Deadline = { rich_text: richText(data.deadlineLabel) };
  }
  if (data.comments) {
    properties.Comments = { rich_text: richText(data.comments) };
  }

  let notionPageId: string | null = null;
  try {
    const res = await fetch(NOTION_API, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${notionToken}`,
        'Notion-Version': NOTION_VERSION,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        parent: { database_id: notionDatabaseId },
        properties,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('[api/contact] Notion error', res.status, errText);
      return NextResponse.json(
        { error: 'Failed to create Notion page' },
        { status: 502 }
      );
    }

    const json = await res.json();
    notionPageId = json.id as string;
  } catch (err) {
    console.error('[api/contact] Notion fetch threw', err);
    return NextResponse.json(
      { error: 'Notion request failed' },
      { status: 502 }
    );
  }

  const enrichWebhook = process.env.N8N_ENRICH_WEBHOOK_URL || 'https://admin.n8n.filmmaikerstudio.com/webhook/filmmaiker-contact-enrich';
  if (notionPageId) {
    try {
      const webhookRes = await fetch(enrichWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notionPageId, ...data }),
      });
      if (!webhookRes.ok) {
        console.error('[api/contact] n8n enrich returned status:', webhookRes.status);
      } else {
        console.log('[api/contact] n8n webhook triggered successfully to:', enrichWebhook);
      }
    } catch (err) {
      console.error('[api/contact] n8n enrich failed', err);
    }
  }

  return NextResponse.json({ success: true, notionPageId }, { status: 200 });
}
