const WHATSAPP_API_URL = "https://graph.facebook.com/v19.0";
const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

export async function sendTextMessage(to: string, text: string) {
  if (!ACCESS_TOKEN || !PHONE_NUMBER_ID) {
    console.warn("[whatsapp] Missing WhatsApp environment variables");
    return;
  }

  try {
    const res = await fetch(`${WHATSAPP_API_URL}/${PHONE_NUMBER_ID}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to,
        type: "text",
        text: { body: text },
      }),
    });
    return await res.json();
  } catch (error) {
    console.error("[whatsapp] Error sending text message:", error);
  }
}

export async function sendButtonMessage(
  to: string,
  bodyText: string,
  buttons: Array<{ id: string; title: string }>
) {
  if (!ACCESS_TOKEN || !PHONE_NUMBER_ID) {
    console.warn("[whatsapp] Missing WhatsApp environment variables");
    return;
  }

  try {
    const res = await fetch(`${WHATSAPP_API_URL}/${PHONE_NUMBER_ID}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to,
        type: "interactive",
        interactive: {
          type: "button",
          body: { text: bodyText },
          action: {
            buttons: buttons.map((btn) => ({
              type: "reply",
              reply: { id: btn.id, title: btn.title },
            })),
          },
        },
      }),
    });
    return await res.json();
  } catch (error) {
    console.error("[whatsapp] Error sending button message:", error);
  }
}

export async function markAsRead(messageId: string) {
  if (!ACCESS_TOKEN || !PHONE_NUMBER_ID) {
    return;
  }

  try {
    await fetch(`${WHATSAPP_API_URL}/${PHONE_NUMBER_ID}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        status: "read",
        message_id: messageId,
      }),
    });
  } catch (error) {
    console.error("[whatsapp] Error marking message as read:", error);
  }
}
