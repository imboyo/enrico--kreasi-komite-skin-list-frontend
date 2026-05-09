"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

import { MobilePagination } from "components/atomic/molecule/MobilePagination";
import { QueryStateHandler } from "components/atomic/molecule/QueryStateHandler";
import {
  getAdminManagers,
  type AdminManager,
  type AdminManagerRole,
} from "mock-backend/admin/user/admins";
import { AccountCardGridSkeleton } from "components/domain/account/AccountCardGridSkeleton";
import {
  DEFAULT_ADMIN_SORT_VALUE,
  AdminListToolbar,
  type AdminSortValue,
} from "client-side-page/admin/user/admin/item-list/AdminListToolbar";
import { ManagerCard } from "client-side-page/admin/user/admin/item-list/item-card/ManagerCard";

function sortAdmins(admins: AdminManager[], sortValue: AdminSortValue) {
  const sorted = [...admins];

  sorted.sort((a, b) => {
    if (sortValue === "name-desc") {
      return b.fullName.localeCompare(a.fullName);
    }

    if (sortValue === "email-asc") {
      return a.email.localeCompare(b.email);
    }

    if (sortValue === "role-asc") {
      return a.role.localeCompare(b.role);
    }

    return a.fullName.localeCompare(b.fullName);
  });

  return sorted;
}

export function ItemList() {
  const [dummyPage, setDummyPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<AdminManagerRole[]>([]);
  const [sortValue, setSortValue] = useState<AdminSortValue>(
    DEFAULT_ADMIN_SORT_VALUE,
  );

  const adminManagersQuery = useQuery({
    queryKey: ["admin-managers"],
    queryFn: async () => {
      return await getAdminManagers();
    },
  });

  const adminManagers = adminManagersQuery.data?.data;
  const visibleAdmins = useMemo(() => {
    const admins = adminManagers ?? [];
    const normalizedSearch = searchValue.trim().toLowerCase();

    // Search and role filters are combined before sorting so the final order
    // only applies to the list the super-admin can currently see.
    const filtered = admins.filter((admin) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        admin.fullName.toLowerCase().includes(normalizedSearch) ||
        admin.email.toLowerCase().includes(normalizedSearch);
      const matchesRole =
        selectedRoles.length === 0 || selectedRoles.includes(admin.role);

      return matchesSearch && matchesRole;
    });

    return sortAdmins(filtered, sortValue);
  }, [adminManagers, searchValue, selectedRoles, sortValue]);

  return (
    <div className="flex flex-col gap-4">
      {/* Section: Admin list toolbar */}
      <AdminListToolbar
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        selectedRoles={selectedRoles}
        onSelectedRolesChange={setSelectedRoles}
        sortValue={sortValue}
        onSortChange={setSortValue}
      />

      <QueryStateHandler
        query={adminManagersQuery}
        skeleton={<AccountCardGridSkeleton />}
        isEmpty={visibleAdmins.length === 0}
        errorTitle="Gagal memuat data admin."
        emptyTitle="Tidak ada admin ditemukan."
        emptyDescription="Coba ubah kata kunci pencarian atau filter role."
      >
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-4">
          {visibleAdmins.map((admin) => (
            <ManagerCard key={admin.id} admin={admin} />
          ))}
        </div>
      </QueryStateHandler>

      <MobilePagination
        currentPage={dummyPage}
        totalPages={3}
        onPageChange={setDummyPage}
      />
    </div>
  );
}
