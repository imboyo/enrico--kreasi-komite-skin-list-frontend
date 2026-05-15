"use client";

import { MobilePagination } from "components/atomic/molecule/MobilePagination";
import { QueryStateHandler } from "components/atomic/molecule/QueryStateHandler";
import { AccountCardGridSkeleton } from "components/atomic/organism/AccountCardGridSkeleton";

import { CustomerListToolbar } from "./CustomerListToolbar";
import { ItemCard } from "./item-card/ItemCard";
import {
  useUserAccountListQuery,
  useUserAccountListStore,
} from "./UserAccountListProvider";
import {
  DEFAULT_USER_ACCOUNT_PAGE_NUMBER,
  getUserAccountsFromResponse,
} from "./utils/userAccountList.store";

export function AccountListContent() {
  const currentPage = useUserAccountListStore((state) => state.currentPage);
  const handlePageChange = useUserAccountListStore(
    (state) => state.handlePageChange,
  );
  const userAccountQuery = useUserAccountListQuery();
  const userAccounts = getUserAccountsFromResponse(userAccountQuery.data);
  const totalPages = Math.max(
    DEFAULT_USER_ACCOUNT_PAGE_NUMBER,
    userAccountQuery.data?.meta.total_pages ?? DEFAULT_USER_ACCOUNT_PAGE_NUMBER,
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Section: Customer list toolbar */}
      <CustomerListToolbar />

      <QueryStateHandler
        query={userAccountQuery}
        skeleton={<AccountCardGridSkeleton />}
        isEmpty={userAccounts.length === 0}
        errorTitle="Gagal memuat data pelanggan."
        emptyTitle="Tidak ada pelanggan ditemukan."
        emptyDescription="Coba ubah kata kunci pencarian atau filter status."
      >
        {/* Section: Customer account card grid */}
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-4">
          {userAccounts.map((user) => (
            <ItemCard key={user.uuid} user={user} />
          ))}
        </div>
      </QueryStateHandler>

      {/* Section: Customer list pagination */}
      <MobilePagination
        currentPage={Math.min(currentPage, totalPages)}
        totalPages={totalPages}
        onPageChange={(page) => handlePageChange(page, totalPages)}
      />
    </div>
  );
}
