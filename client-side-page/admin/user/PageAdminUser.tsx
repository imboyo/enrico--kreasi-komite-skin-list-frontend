"use client";

import { motion } from "motion/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { Skeleton } from "@/components/atomic/atom/Skeleton";
import { MobilePagination } from "@/components/atomic/molecule/MobilePagination";
import { QueryStateHandler } from "@/components/atomic/molecule/QueryStateHandler";
import { UserCard } from "@/client-side-page/admin/user/user-card/UserCard";
import { getAdminUsers } from "@/mock-backend/admin/user/users";
import { LoadingState } from "@/client-side-page/admin/user/LoadingState";



export function PageAdminUser() {
  const [dummyPage, setDummyPage] = useState(1);
  const adminUsersQuery = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      return await getAdminUsers();
    },
  });

  const users = adminUsersQuery.data?.data ?? [];

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

      <MobilePagination
        currentPage={dummyPage}
        totalPages={8}
        onPageChange={setDummyPage}
      />

      {/* Section: User card list */}
      <section>
        <QueryStateHandler
          query={adminUsersQuery}
          skeleton={<LoadingState />}
          isEmpty={users.length === 0}
          errorTitle="Failed to load users."
          emptyTitle="No users available."
          emptyDescription="There are no registered users in the mock backend yet."
        >
          <div className="flex flex-col gap-3">
            {users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        </QueryStateHandler>
      </section>

      <MobilePagination
        currentPage={dummyPage}
        totalPages={8}
        onPageChange={setDummyPage}
      />
    </motion.div>
  );
}
