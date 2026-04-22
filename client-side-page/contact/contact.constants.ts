import { appConfig } from "@/config";

const { contact } = appConfig;

const getWhatsappHref = (phoneNumber: string) => `https://wa.me/${phoneNumber.replace(/\D/g, "")}`;
const getInstagramHref = (username: string) => `https://instagram.com/${username.replace(/^@/, "")}`;

export const contactChannels = [
  {
    title: "Email Support",
    description: "Best for product questions, feedback, or reporting issues.",
    value: contact.email,
    href: `mailto:${contact.email}`,
    icon: "material-symbols:mail-outline-rounded",
  },
  {
    title: "Phone",
    description: "Use this when you need the office phone number for direct calls.",
    value: contact.phoneNumber,
    href: `tel:${contact.phoneNumber.replace(/\s+/g, "")}`,
    icon: "material-symbols:call-outline-rounded",
  },
  {
    title: "WhatsApp",
    description: "Use this for quick follow-ups and routine-related questions.",
    value: contact.whatsappNumber,
    href: getWhatsappHref(contact.whatsappNumber),
    icon: "ri:whatsapp-line",
  },
  {
    title: "Instagram",
    description: "Check updates, launches, and visual references from the team.",
    value: `@${contact.instagramUsername.replace(/^@/, "")}`,
    href: getInstagramHref(contact.instagramUsername),
    icon: "ri:instagram-line",
  },
] as const;

export const supportNotes = [
  {
    title: "Response Window",
    description: "Replies usually land within 1 x 24 hours on business days.",
    icon: "material-symbols:schedule-outline-rounded",
  },
  {
    title: "Office Hours",
    description: contact.officeHours,
    icon: "material-symbols:calendar-clock-outline-rounded",
  },
  {
    title: "Coverage",
    description: "We can help with routine tracking, skin-tone notes, and account access.",
    icon: "material-symbols:support-agent-rounded",
  },
] as const;
