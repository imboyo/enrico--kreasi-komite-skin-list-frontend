export type ChatMessage = {
  uuid: string;
  author: "USER" | "ADMIN";
  text?: string;
  type?: "text" | "image" | "file";
  status?: "sending" | "sent" | "delivered" | "read";
  createdAt: string;
  imageUrl?: string;
  imageAlt?: string;
  fileUrl?: string;
  fileName?: string;
};
