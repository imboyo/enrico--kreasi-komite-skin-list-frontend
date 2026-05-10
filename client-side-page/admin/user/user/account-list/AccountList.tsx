"use client";

import { MobilePagination } from "components/atomic/molecule/MobilePagination";
import { QueryStateHandler } from "components/atomic/molecule/QueryStateHandler";
import { AccountCardGridSkeleton } from "components/atomic/organism/AccountCardGridSkeleton";
import { ItemCard } from "client-side-page/admin/user/user/account-list/item-card/ItemCard";
import { CustomerListToolbar } from "client-side-page/admin/user/user/account-list/CustomerListToolbar";
import { useUserAccountList } from "client-side-page/admin/user/user/account-list/useUserAccountList";

export function AccountList() {
  const {
    userAccounts,
    userAccountQuery,
    currentPage,
    totalPages,
    searchValue,
    selectedStatuses,
    sortValue,
    handlePageChange,
    handleSearchChange,
    handleSelectedStatusesChange,
    handleSortChange,
  } = useUserAccountList();

  return (
    <div className="flex flex-col gap-4">
      {/* Section: Customer list toolbar */}
      <CustomerListToolbar
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        selectedStatuses={selectedStatuses}
        onSelectedStatusesChange={handleSelectedStatusesChange}
        sortValue={sortValue}
        onSortChange={handleSortChange}
      />

      <QueryStateHandler
        query={userAccountQuery}
        skeleton={<AccountCardGridSkeleton />}
        isEmpty={userAccounts.length === 0}
        errorTitle="Gagal memuat data pelanggan."
        emptyTitle="Tidak ada pelanggan ditemukan."
        emptyDescription="Coba ubah kata kunci pencarian atau filter status."
      >
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-4">
          {userAccounts.map((user) => (
            <ItemCard key={user.uuid} user={user} />
          ))}
        </div>
      </QueryStateHandler>

      <MobilePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
