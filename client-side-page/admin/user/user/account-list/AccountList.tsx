"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { MobilePagination } from "components/atomic/molecule/MobilePagination";
import { QueryStateHandler } from "components/atomic/molecule/QueryStateHandler";
import { AccountCardGridSkeleton } from "components/atomic/organism/AccountCardGridSkeleton";
import { ItemCard } from "client-side-page/admin/user/user/account-list/item-card/ItemCard";
import {
  listUserAccount,
  type UserAccount,
} from "backend-service/admin/account/user";
import type { AccountStatus } from "backend-service/admin/account";
import {
  DEFAULT_USER_SORT_VALUE,
  CustomerListToolbar,
  type UserSortValue,
} from "client-side-page/admin/user/user/account-list/CustomerListToolbar";

const PAGE_LIMIT = 10;

function buildSortDto(sortValue: UserSortValue) {
  switch (sortValue) {
    case "name-desc":
      return { field: "full_name", direction: "DESC" } as const;
    case "phone-asc":
      return { field: "phone_number", direction: "ASC" } as const;
    case "phone-desc":
      return { field: "phone_number", direction: "DESC" } as const;
    case "status-asc":
      return { field: "status", direction: "ASC" } as const;
    case "name-asc":
    default:
      return { field: "full_name", direction: "ASC" } as const;
  }
}

function buildFilterDto(statuses: AccountStatus[]) {
  if (statuses.length === 0) return undefined;

  return {
    and: statuses.map((status) => ({
      field: "status" as const,
      operator: "eq" as const,
      value: status,
    })),
  };
}

export function AccountList() {
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<AccountStatus[]>([]);
  const [sortValue, setSortValue] = useState<UserSortValue>(
    DEFAULT_USER_SORT_VALUE,
  );

  const userAccountQuery = useQuery({
    queryKey: [
      "list-user-account",
      page,
      searchValue,
      selectedStatuses,
      sortValue,
    ],
    queryFn: async () => {
      return await listUserAccount({
        page,
        limit: PAGE_LIMIT,
        search: searchValue.trim() || undefined,
        sort: [buildSortDto(sortValue)],
        filter: buildFilterDto(selectedStatuses),
      });
    },
  });

  const users: UserAccount[] = userAccountQuery.data?.data ?? [];
  const meta = userAccountQuery.data?.meta;
  const totalPages = meta?.total_pages ?? 1;

  return (
    <div className="flex flex-col gap-4">
      {/* Section: Customer list toolbar */}
      <CustomerListToolbar
        searchValue={searchValue}
        onSearchChange={(value) => {
          setSearchValue(value);
          setPage(1);
        }}
        selectedStatuses={selectedStatuses}
        onSelectedStatusesChange={(statuses) => {
          setSelectedStatuses(statuses);
          setPage(1);
        }}
        sortValue={sortValue}
        onSortChange={(value) => {
          setSortValue(value);
          setPage(1);
        }}
      />

      <QueryStateHandler
        query={userAccountQuery}
        skeleton={<AccountCardGridSkeleton />}
        isEmpty={users.length === 0}
        errorTitle="Gagal memuat data pelanggan."
        emptyTitle="Tidak ada pelanggan ditemukan."
        emptyDescription="Coba ubah kata kunci pencarian atau filter status."
      >
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-4">
          {users.map((user) => (
            <ItemCard key={user.uuid} user={user} />
          ))}
        </div>
      </QueryStateHandler>

      <MobilePagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
