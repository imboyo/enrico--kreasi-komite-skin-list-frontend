import { NEXT_PUBLIC_BACKEND_HOST } from "config";
import { parseOrThrow } from "libs/util/parse-or-throw";

import type {
  AddAdminAccountPayload,
  AddAdminAccountResponse,
} from "./types";

// POST /auth/add-admin-account — creates a new admin account (requires super admin key)
export async function addAdminAccount(
  payload: AddAdminAccountPayload,
): Promise<AddAdminAccountResponse> {
  const res = await fetch(
    `${NEXT_PUBLIC_BACKEND_HOST}/auth/add-admin-account`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
  );
  return parseOrThrow<AddAdminAccountResponse>(res);
}
