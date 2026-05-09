"use client";

import { QueryStateHandler } from "components/atomic/molecule/QueryStateHandler";
import { AccountCardGridSkeleton } from "components/atomic/organism/AccountCardGridSkeleton";
import { MobilePagination } from "components/atomic/molecule/MobilePagination";
import { AdminListToolbar } from "client-side-page/admin/user/admin/item-list/AdminListToolbar";
import { useAdminAccountList } from "client-side-page/admin/user/admin/item-list/useAdminAccountList";
import { ItemCard } from "client-side-page/admin/user/admin/item-list/item-card/ItemCard";

export function ItemList() {
  const {
    adminAccounts,
    adminAccountsQuery,
    currentPage,
    totalPages,
    searchValue,
    selectedStatuses,
    sortValue,
    handlePageChange,
    handleSearchChange,
    handleSelectedStatusesChange,
    handleSortChange,
  } = useAdminAccountList();

  return (
    <div className="flex flex-col gap-4">
      {/* Section: Admin list toolbar */}
      <AdminListToolbar
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        selectedStatuses={selectedStatuses}
        onSelectedStatusesChange={handleSelectedStatusesChange}
        sortValue={sortValue}
        onSortChange={handleSortChange}
      />

      <QueryStateHandler
        query={adminAccountsQuery}
        skeleton={<AccountCardGridSkeleton />}
        isEmpty={adminAccounts.length === 0}
        errorTitle="Gagal memuat data admin."
        emptyTitle="Tidak ada admin ditemukan."
        emptyDescription="Coba ubah kata kunci pencarian atau filter status."
      >
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-4">
          {adminAccounts.map((admin) => (
            <ItemCard key={admin.uuid} admin={admin} />
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
