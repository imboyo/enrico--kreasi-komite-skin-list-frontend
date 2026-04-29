"use client";

import { Icon } from "@iconify/react";
import { useQuery } from "@tanstack/react-query";

import { SkinAdminCard } from "components/domain/skin/SkinAdminCard";
import { SkinAdminSkeleton } from "components/domain/skin/SkinAdminSkeleton";
import { Button } from "components/atomic/atom/Button";
import {
  MenuDropdown,
  MenuDropdownItem,
  MenuDropdownSeparator,
} from "components/atomic/molecule/MenuDropdown";
import { QueryStateHandler } from "components/atomic/molecule/QueryStateHandler";
import {
  getMakeUps,
  type SkinCareMakeUpItem,
} from "mock-backend/skin-care/get-make-ups";

export function PageAdminSkinMakeUps() {
  const makeUpsQuery = useQuery({
    queryKey: ["admin-skin-make-ups"],
    queryFn: async () => {
      return await getMakeUps();
    },
  });

  const makeUps = makeUpsQuery.data?.data ?? [];

  function handleMakeUpAction(action: string, makeUp: SkinCareMakeUpItem) {
    // Keep each endpoint action isolated so this page can later call
    // make-up-specific edit, hide, or delete APIs.
    console.log(`Admin make up action: ${action}`, makeUp);
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Section: Skin make ups header */}
      <section className="flex flex-col gap-1">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Skin Management
        </p>
        <h1 className="text-2xl font-semibold text-foreground">Make Ups</h1>
      </section>

      <QueryStateHandler
        query={makeUpsQuery}
        skeleton={<SkinAdminSkeleton />}
        isEmpty={makeUps.length === 0}
        errorTitle="Failed to load make ups."
        emptyTitle="No make ups found."
        emptyDescription="Refresh the mock data and try again."
      >
        {/* Section: Make up card list */}
        <div className="flex flex-col gap-3">
          {makeUps.map((makeUp) => (
            <SkinAdminCard
              key={makeUp.id}
              item={makeUp}
              icon={
                <Icon
                  icon="material-symbols:face-retouching-natural-outline-rounded"
                  className="size-6"
                />
              }
              actions={
                <MenuDropdown
                  align="start"
                  side="bottom"
                  trigger={
                    <Button
                      variant="ghost"
                      size="sm"
                      iconOnly
                      aria-label={`Open actions for ${makeUp.label}`}
                      className="rounded-full"
                    >
                      <Icon icon="material-symbols:more-vert" />
                    </Button>
                  }
                >
                  {/* Section: Make up row actions */}
                  <MenuDropdownItem
                    icon={<Icon icon="material-symbols:edit-outline-rounded" />}
                    onSelect={() => handleMakeUpAction("edit", makeUp)}
                  >
                    Edit make up
                  </MenuDropdownItem>
                  <MenuDropdownSeparator />
                  <MenuDropdownItem
                    destructive
                    icon={
                      <Icon icon="material-symbols:visibility-off-outline-rounded" />
                    }
                    onSelect={() => handleMakeUpAction("hide", makeUp)}
                  >
                    Hide make up
                  </MenuDropdownItem>
                  <MenuDropdownItem
                    destructive
                    icon={<Icon icon="material-symbols:delete-outline" />}
                    onSelect={() => handleMakeUpAction("delete", makeUp)}
                  >
                    Delete make up
                  </MenuDropdownItem>
                </MenuDropdown>
              }
            />
          ))}
        </div>
      </QueryStateHandler>
    </div>
  );
}
