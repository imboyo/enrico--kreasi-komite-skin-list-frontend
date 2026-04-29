"use client";

import { Icon } from "@iconify/react";
import { useQuery } from "@tanstack/react-query";

import { SkinAdminCard } from "components/domain/skin/SkinAdminCard";
import { Button } from "components/atomic/atom/Button";
import {
  MenuDropdown,
  MenuDropdownItem,
  MenuDropdownSeparator,
} from "components/atomic/molecule/MenuDropdown";
import { QueryStateHandler } from "components/atomic/molecule/QueryStateHandler";
import {
  getColors,
  type SkinCareColorItem,
} from "mock-backend/skin-care/get-colors";
import { SkinAdminSkeleton } from "components/domain/skin/SkinAdminSkeleton";

export function PageAdminSkinColors() {
  const colorsQuery = useQuery({
    queryKey: ["admin-skin-colors"],
    queryFn: async () => {
      return await getColors();
    },
  });

  const colors = colorsQuery.data?.data ?? [];

  function handleColorAction(action: string, color: SkinCareColorItem) {
    // Keep each endpoint action isolated so this page can later call
    // color-specific edit, hide, or delete APIs.
    console.log(`Admin color action: ${action}`, color);
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Section: Skin colors header */}
      <section className="flex flex-col gap-1">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Skin Management
        </p>
        <h1 className="text-2xl font-semibold text-foreground">Colors</h1>
      </section>

      <QueryStateHandler
        query={colorsQuery}
        skeleton={<SkinAdminSkeleton />}
        isEmpty={colors.length === 0}
        errorTitle="Failed to load colors."
        emptyTitle="No colors found."
        emptyDescription="Refresh the mock data and try again."
      >
        {/* Section: Color card list */}
        <div className="flex flex-col gap-3">
          {colors.map((color) => (
            <SkinAdminCard
              key={color.id}
              item={color}
              icon={
                <Icon
                  icon="material-symbols:palette-outline-rounded"
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
                      aria-label={`Open actions for ${color.label}`}
                      className="rounded-full"
                    >
                      <Icon icon="material-symbols:more-vert" />
                    </Button>
                  }
                >
                  {/* Section: Color row actions */}
                  <MenuDropdownItem
                    icon={<Icon icon="material-symbols:edit-outline-rounded" />}
                    onSelect={() => handleColorAction("edit", color)}
                  >
                    Edit color
                  </MenuDropdownItem>
                  <MenuDropdownSeparator />
                  <MenuDropdownItem
                    destructive
                    icon={
                      <Icon icon="material-symbols:visibility-off-outline-rounded" />
                    }
                    onSelect={() => handleColorAction("hide", color)}
                  >
                    Hide color
                  </MenuDropdownItem>
                  <MenuDropdownItem
                    destructive
                    icon={<Icon icon="material-symbols:delete-outline" />}
                    onSelect={() => handleColorAction("delete", color)}
                  >
                    Delete color
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
