"use client";

import { Icon } from "@iconify/react";
import { useQuery } from "@tanstack/react-query";

import { SkinCareAdminCard } from "components/atomic/organism/SkinCareAdminCard";
import { SkinCareAdminCardSkeleton } from "components/atomic/molecule/SkinCareAdminCardSkeleton";
import { Button } from "components/atomic/atom/Button";
import {
  MenuDropdown,
  MenuDropdownItem,
  MenuDropdownSeparator,
} from "components/atomic/molecule/MenuDropdown";
import { QueryStateHandler } from "components/atomic/molecule/QueryStateHandler";
import {
  getScars,
  type SkinCareScarItem,
} from "mock-backend/skin-care/get-scars";

export function PageAdminSkinScars() {
  const scarsQuery = useQuery({
    queryKey: ["admin-skin-scars"],
    queryFn: async () => {
      return await getScars();
    },
  });

  const scars = scarsQuery.data?.data ?? [];

  function handleScarAction(action: string, scar: SkinCareScarItem) {
    // Keep each endpoint action isolated so this page can later call
    // scar-specific edit, hide, or delete APIs.
    console.log(`Admin scar action: ${action}`, scar);
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Section: Skin scars header */}
      <section className="flex flex-col gap-1">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Skin Management
        </p>
        <h1 className="text-2xl font-semibold text-foreground">Scars</h1>
      </section>

      <QueryStateHandler
        query={scarsQuery}
        skeleton={<SkinCareAdminCardSkeleton />}
        isEmpty={scars.length === 0}
        errorTitle="Failed to load scars."
        emptyTitle="No scars found."
        emptyDescription="Refresh the mock data and try again."
      >
        {/* Section: Scar card list */}
        <div className="flex flex-col gap-3">
          {scars.map((scar) => (
            <SkinCareAdminCard
              key={scar.id}
              item={scar}
              icon={
                <Icon
                  icon="material-symbols:dermatology-outline-rounded"
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
                      aria-label={`Open actions for ${scar.label}`}
                      className="rounded-full"
                    >
                      <Icon icon="material-symbols:more-vert" />
                    </Button>
                  }
                >
                  {/* Section: Scar row actions */}
                  <MenuDropdownItem
                    icon={<Icon icon="material-symbols:edit-outline-rounded" />}
                    onSelect={() => handleScarAction("edit", scar)}
                  >
                    Edit scar
                  </MenuDropdownItem>
                  <MenuDropdownSeparator />
                  <MenuDropdownItem
                    destructive
                    icon={
                      <Icon icon="material-symbols:visibility-off-outline-rounded" />
                    }
                    onSelect={() => handleScarAction("hide", scar)}
                  >
                    Hide scar
                  </MenuDropdownItem>
                  <MenuDropdownItem
                    destructive
                    icon={<Icon icon="material-symbols:delete-outline" />}
                    onSelect={() => handleScarAction("delete", scar)}
                  >
                    Delete scar
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
