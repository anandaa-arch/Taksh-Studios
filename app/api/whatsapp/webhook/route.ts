// app/api/whatsapp/webhook/route.ts
// Handles both:
//  - GET: Meta's one-time webhook verification handshake
//  - POST: incoming WhatsApp messages (customer DMs)

import { NextRequest, NextResponse } from "next/server";
import { sendTextMessage, sendButtonMessage, markAsRead } from "@/lib/whatsapp";
import { detectIntent, getReplyForIntent } from "@/lib/intents";

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;

// --- 1. Webhook verification (Meta calls this once when you save the webhook config) ---
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const mode = searchParams.get("hub.mode");
    const token = searchParams.get("hub.verify_token");
    const challenge = searchParams.get("hub.challenge");

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
        console.log("WhatsApp webhook verified successfully");
        return new NextResponse(challenge, { status: 200 });
    }

    console.warn("WhatsApp webhook verification failed — token mismatch");
    return new NextResponse("Forbidden", { status: 403 });
}

// --- 2. Incoming messages ---
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // WhatsApp sends a nested payload — walk down to the actual message object.
        const entry = body?.entry?.[0];
        const change = entry?.changes?.[0];
        const value = change?.value;
        const message = value?.messages?.[0];

        // This webhook also fires for delivery/read status updates — ignore those.
        if (!message) {
            return NextResponse.json({ status: "ignored" }, { status: 200 });
        }

        const from = message.from; // customer's phone number
        const messageId = message.id;
        const contactName = value?.contacts?.[0]?.profile?.name;

        // Mark as read immediately (good UX, shows blue ticks)
        await markAsRead(messageId);

        // Extract text depending on message type
        let text = "";
        if (message.type === "text") {
            text = message.text.body;
        } else if (message.type === "interactive") {
            text =
                message.interactive?.button_reply?.title ||
                message.interactive?.list_reply?.title ||
                "";
        } else {
            // Images, documents (e.g. STL files), audio, etc.
            await sendTextMessage(
                from,
                `Got your file! 📎 Our team will review it and get back to you shortly with details.`
            );
            // TODO: log this to your DB — file-based custom order requests should probably
            // notify you directly (e.g. via a Telegram/Slack webhook) since they need a human.
            return NextResponse.json({ status: "handled_media" }, { status: 200 });
        }

        // --- Route based on detected intent ---
        const intent = detectIntent(text);

        if (intent === "greeting" || intent === "unknown") {
            // Send a quick-reply button menu instead of plain text for these two cases
            await sendButtonMessage(
                from,
                getReplyForIntent(intent, contactName),
                [
                    { id: "start_order", title: "Start Custom Order" },
                    { id: "pricing_info", title: "Pricing Info" },
                    { id: "talk_human", title: "Talk to Team" },
                ]
            );
        } else {
            await sendTextMessage(from, getReplyForIntent(intent, contactName));
        }

        // TODO: persist this conversation to your database (Supabase/Postgres) so you
        // have order history and can review conversations later, e.g.:
        // await db.insert("whatsapp_messages", { from, text, intent, timestamp: new Date() });

        // TODO: for `human_handoff` or file uploads, consider pinging yourself directly
        // via a Telegram bot or Slack webhook so you don't miss time-sensitive requests.

        return NextResponse.json({ status: "ok" }, { status: 200 });
    } catch (err: any) {
        console.error("Error handling WhatsApp webhook:", err);
        // Always return 200 to Meta even on internal errors, or they'll retry aggressively
        // and eventually disable your webhook for repeated failures.
        return NextResponse.json({ status: "error", message: err.message }, { status: 200 });
    }
}