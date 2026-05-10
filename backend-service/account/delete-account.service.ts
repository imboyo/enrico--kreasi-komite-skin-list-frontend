import { parseOrThrow } from "libs/util/parse-or-throw";

import { fetcher } from "backend-service/util/use-fetcher";

import type { DeleteAccountResponse } from "./types";

// DELETE /account — soft-deletes account and marks status as TO_DELETED
export async function deleteAccount(): Promise<DeleteAccountResponse> {
  const res = await fetcher("/account", { method: "DELETE" });
  return parseOrThrow<DeleteAccountResponse>(res);
}
