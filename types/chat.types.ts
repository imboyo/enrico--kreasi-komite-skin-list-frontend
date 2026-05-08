export type ChatMessage = {
  uuid: string;
  author: "USER" | "ADMIN";
  text?: string;
  status?: "sending" | "sent";
  createdAt: string;
};
