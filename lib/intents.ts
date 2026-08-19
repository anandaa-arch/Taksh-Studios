export type IntentType =
  | "greeting"
  | "start_order"
  | "pricing_info"
  | "talk_human"
  | "unknown";

export function detectIntent(text: string): IntentType {
  const lower = text.toLowerCase().trim();

  if (
    lower.includes("hi") ||
    lower.includes("hello") ||
    lower.includes("hey") ||
    lower.includes("namaste")
  ) {
    return "greeting";
  }

  if (
    lower.includes("order") ||
    lower.includes("custom") ||
    lower.includes("print") ||
    lower.includes("carv") ||
    lower.includes("start_order")
  ) {
    return "start_order";
  }

  if (
    lower.includes("price") ||
    lower.includes("pricing") ||
    lower.includes("cost") ||
    lower.includes("rate") ||
    lower.includes("pricing_info")
  ) {
    return "pricing_info";
  }

  if (
    lower.includes("talk") ||
    lower.includes("human") ||
    lower.includes("support") ||
    lower.includes("call") ||
    lower.includes("team") ||
    lower.includes("talk_human")
  ) {
    return "talk_human";
  }

  return "unknown";
}

export function getReplyForIntent(intent: IntentType, contactName?: string): string {
  const name = contactName ? ` ${contactName}` : "";

  switch (intent) {
    case "greeting":
      return `Hello${name}! Welcome to Taksh Studios. We specialize in precision 3D printing and custom wood carving. How can we craft for you today?`;
    case "start_order":
      return `Awesome! You can submit a custom order directly on our site at https://www.takshstudios.com/custom-order or share your requirements (and STL/design files) right here in this chat!`;
    case "pricing_info":
      return `Our pricing depends on material, dimensions, and finishing time. Browse our standard catalog at https://www.takshstudios.com/products or share your 3D/wood model for an instant estimate.`;
    case "talk_human":
      return `Connecting you to our master craftsman! Our team is notified and will reach out to you shortly.`;
    default:
      return `Thanks for reaching out to Taksh Studios! Please select an option below or send us your project details:`;
  }
}
