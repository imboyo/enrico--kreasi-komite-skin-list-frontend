"use client";

import { motion } from "motion/react";
import { useQuery } from "@tanstack/react-query";

import { Skeleton } from "@/components/atomic/atom/Skeleton";
import { QueryStateHandler } from "@/components/atomic/molecule/QueryStateHandler";
import { UserCard } from "@/client-side-page/admin/user/user-card/UserCard";
import { getAdminUsers } from "@/mock-backend/admin/user/users";

function UserCardLoadingState() {
  return (
    <div className="flex flex-col gap-3">
      {/* Section: User card skeleton */}
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="rounded-[24px] border border-border bg-card p-4"
        >
          <div className="flex items-start gap-3">
            <Skeleton className="size-11 rounded-2xl" />
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <Skeleton className="h-5 w-2/3 rounded-lg" />
              <Skeleton className="h-4 w-full rounded-lg" />
            </div>
            <Skeleton className="size-8 rounded-full" />
          </div>
          <div className="mt-4 flex justify-end">
            <Skeleton className="h-8 w-20 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function PageAdminUser() {
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

      {/* Section: User card list */}
      <section>
        <QueryStateHandler
          query={adminUsersQuery}
          skeleton={<UserCardLoadingState />}
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
    </motion.div>
  );
}
