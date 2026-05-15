"use client";

import { AccountListContent } from "./AccountListContent";
import { UserAccountListProvider } from "./UserAccountListProvider";

export function AccountList() {
  return (
    <UserAccountListProvider>
      <AccountListContent />
    </UserAccountListProvider>
  );
}
