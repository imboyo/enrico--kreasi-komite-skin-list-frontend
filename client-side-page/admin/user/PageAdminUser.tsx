"use client";

import { motion } from "motion/react";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

import { MobilePagination } from "@/components/atomic/molecule/MobilePagination";
import { QueryStateHandler } from "@/components/atomic/molecule/QueryStateHandler";
import { UserCard } from "@/client-side-page/admin/user/user-card/UserCard";
import {
  getAdminUsers,
  type AdminUser,
  type AdminUserStatus,
} from "@/mock-backend/admin/user/users";
import { LoadingState } from "@/client-side-page/admin/user/LoadingState";
import {
  DEFAULT_USER_SORT_VALUE,
  UserToolbar,
  type UserSortValue,
} from "@/client-side-page/admin/user/user-toolbar/UserToolbar";

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

export function PageAdminUser() {
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
    <motion.div
      className="mx-auto flex w-full max-w-125 flex-1 flex-col gap-4 px-4 py-4"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      {/* Section: User list header */}
      <section className="flex flex-col gap-1">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Admin
        </p>
        <h1 className="text-2xl font-semibold text-foreground">User List</h1>
      </section>

      {/* Section: User list toolbar */}
      <UserToolbar
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        selectedStatuses={selectedStatuses}
        onSelectedStatusesChange={setSelectedStatuses}
        sortValue={sortValue}
        onSortChange={setSortValue}
      />

      <QueryStateHandler
        query={adminUsersQuery}
        skeleton={<LoadingState />}
        isEmpty={visibleUsers.length === 0}
        errorTitle="Failed to load users."
        emptyTitle="No users found."
        emptyDescription="Try changing the search keyword or filter status."
      >
        <div className="flex flex-col gap-3">
          {visibleUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </QueryStateHandler>

      <MobilePagination
        currentPage={dummyPage}
        totalPages={8}
        onPageChange={setDummyPage}
      />
    </motion.div>
  );
}
