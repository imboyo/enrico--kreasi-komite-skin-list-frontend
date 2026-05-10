import "dotenv/config"

export const appConfig = {
  contact: {
    email: "support@kreasikomite.site",
    phoneNumber: "+62 411-123-456",
    whatsappNumber: "+62 812-3456-7890",
    instagramUsername: "kreasikomite.skin",
    officeHours: "Monday to Friday, 09.00 to 17.00 WITA.",
  },
  developer: {
    githubUsername: "imboyo",
  },
} as const;

export const NEXT_PUBLIC_BACKEND_HOST = process.env.NEXT_PUBLIC_BACKEND_HOST ?? "http://localhost:3000";

export const CHAT_REFRESH_INTERVAL_MS = 5000;
export const CHAT_PAGE_SIZE = 50;
export const ADMIN_CHAT_PAGE_SIZE = 100;