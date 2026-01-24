import { NextRequest, NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(request: NextRequest) {
  try {
    const { name, email, telegram, message } = await request.json();

    if (!name || !message) {
      return NextResponse.json({ error: 'Name and message are required' }, { status: 400 });
    }

    if (!email && !telegram) {
      return NextResponse.json({ error: 'Email or Telegram is required' }, { status: 400 });
    }

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error('Telegram credentials not configured');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const contactLines: string[] = [];
    if (email) contactLines.push(`📧 *Email:* ${escapeMarkdown(email)}`);
    if (telegram) contactLines.push(`✈️ *Telegram:* ${escapeMarkdown(normalizeTelegram(telegram))}`);

    const text = `📬 *Новое сообщение с портфолио*

👤 *Имя:* ${escapeMarkdown(name)}
${contactLines.join('\n')}

💬 *Сообщение:*
${escapeMarkdown(message)}`;

    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text,
          parse_mode: 'Markdown',
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error('Telegram API error:', error);
      return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function escapeMarkdown(text: string): string {
  return text.replace(/[_*[\]()~`>#+\-=|{}.!]/g, '\\$&');
}

function normalizeTelegram(input: string): string {
  const trimmed = input.trim();
  // Extract username from t.me link
  const linkMatch = trimmed.match(/(?:t\.me|telegram\.me)\/([a-zA-Z0-9_]+)/);
  if (linkMatch) {
    return `@${linkMatch[1]}`;
  }
  // Add @ if missing
  if (!trimmed.startsWith('@') && !trimmed.includes('/')) {
    return `@${trimmed}`;
  }
  return trimmed;
}
