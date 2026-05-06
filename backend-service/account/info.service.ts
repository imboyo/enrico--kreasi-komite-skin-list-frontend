import { parseOrThrow } from "libs/util/parse-or-throw";

import { fetcher } from "backend-service/util/use-fetcher";

import type {
  UpdateAccountInfoPayload,
  UpdateAccountInfoResponse,
} from "./types";

// PATCH /account/info — updates basic account info (currently full_name)
export async function updateAccountInfo(
  payload: UpdateAccountInfoPayload,
): Promise<UpdateAccountInfoResponse> {
  const res = await fetcher("/account/info", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseOrThrow<UpdateAccountInfoResponse>(res);
}
