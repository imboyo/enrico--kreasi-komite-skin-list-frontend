"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

import { MobilePagination } from "components/atomic/molecule/MobilePagination";
import { QueryStateHandler } from "components/atomic/molecule/QueryStateHandler";
import { AccountCardGridSkeleton } from "components/atomic/organism/AccountCardGridSkeleton";
import { ItemCard } from "client-side-page/admin/user/user/account-list/item-card/ItemCard";
import {
  getAdminUsers,
  type AdminUser,
  type AdminUserStatus,
} from "mock-backend/admin/user/users";
import {
  DEFAULT_USER_SORT_VALUE,
  CustomerListToolbar,
  type UserSortValue,
} from "client-side-page/admin/user/user/account-list/CustomerListToolbar";

function sortUsers(users: AdminUser[], sortValue: UserSortValue) {
  const sortedUsers = [...users];

  sortedUsers.sort((firstUser, secondUser) => {
    if (sortValue === "name-desc") {
      return secondUser.fullName.localeCompare(firstUser.fullName);
    }

    if (sortValue === "email-asc") {
      return firstUser.email.localeCompare(secondUser.email);
    }

    if (sortValue === "status-asc") {
      return firstUser.status.localeCompare(secondUser.status);
    }

    return firstUser.fullName.localeCompare(secondUser.fullName);
  });

  return sortedUsers;
}

export function AccountList() {
  const [dummyPage, setDummyPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<AdminUserStatus[]>(
    [],
  );
  const [sortValue, setSortValue] = useState<UserSortValue>(
    DEFAULT_USER_SORT_VALUE,
  );
  const adminUsersQuery = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      return await getAdminUsers();
    },
  });

  const adminUsers = adminUsersQuery.data?.data;
  const visibleUsers = useMemo(() => {
    const users = adminUsers ?? [];
    const normalizedSearch = searchValue.trim().toLowerCase();

    // Search and status filters are combined before sorting so the final order
    // only applies to the list the admin can currently see.
    const filteredUsers = users.filter((user) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        user.fullName.toLowerCase().includes(normalizedSearch) ||
        user.email.toLowerCase().includes(normalizedSearch);
      const matchesStatus =
        selectedStatuses.length === 0 || selectedStatuses.includes(user.status);

      return matchesSearch && matchesStatus;
    });

    return sortUsers(filteredUsers, sortValue);
  }, [adminUsers, searchValue, selectedStatuses, sortValue]);

  return (
    <div className="flex flex-col gap-4">
      {/* Section: Customer list toolbar */}
      <CustomerListToolbar
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        selectedStatuses={selectedStatuses}
        onSelectedStatusesChange={setSelectedStatuses}
        sortValue={sortValue}
        onSortChange={setSortValue}
      />

      <QueryStateHandler
        query={adminUsersQuery}
        skeleton={<AccountCardGridSkeleton />}
        isEmpty={visibleUsers.length === 0}
        errorTitle="Gagal memuat data pelanggan."
        emptyTitle="Tidak ada pelanggan ditemukan."
        emptyDescription="Coba ubah kata kunci pencarian atau filter status."
      >
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-4">
          {visibleUsers.map((user) => (
            <ItemCard key={user.id} user={user} />
          ))}
        </div>
      </QueryStateHandler>

      <MobilePagination
        currentPage={dummyPage}
        totalPages={8}
        onPageChange={setDummyPage}
      />
    </div>
  );
}
