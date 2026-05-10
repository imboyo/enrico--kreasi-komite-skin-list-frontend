"use client";

import { Icon } from "@iconify/react";
import { Fragment } from "react";

import { Button } from "@/components/atomic/atom/Button";
import { SkinCareAdminCard } from "@/components/atomic/organism/SkinCareAdminCard";
import { AdminSkinTabNavigation } from "@/components/atomic/organism/AdminSkinTabNavigation";
import {
  MenuDropdown,
  MenuDropdownItem,
  MenuDropdownSeparator,
} from "@/components/atomic/molecule/MenuDropdown";
import { QueryStateHandler } from "@/components/atomic/molecule/QueryStateHandler";
import { SkinCareAdminCardSkeleton } from "@/components/atomic/molecule/SkinCareAdminCardSkeleton";

import { useAdminSkinCategories } from "./utils/useAdminSkinCategories";
import type {
  AdminSkinActionId,
  AdminSkinCategoryAction,
  AdminSkinCategoryId,
} from "./utils/skinCategory";

interface PageAdminSkinsProps {
  activeCategory: AdminSkinCategoryId;
}

function getFirstDestructiveActionIndex(
  actions: AdminSkinCategoryAction[],
): number {
  return actions.findIndex((action) => action.destructive);
}

export function PageAdminSkins({
  activeCategory,
}: Readonly<PageAdminSkinsProps>) {
  const { activeCategoryConfig, activeItems, adminSkinCategoriesQuery } =
    useAdminSkinCategories(activeCategory);

  const firstDestructiveActionIndex = getFirstDestructiveActionIndex(
    activeCategoryConfig.actions,
  );

  function handleSkinAction(action: AdminSkinActionId, itemId: string) {
    // Keep the action boundary explicit so edit / hide / delete can later be
    // wired to different admin mutations without reshaping the page flow again.
    console.log(`Admin ${activeCategoryConfig.singularLabel} action: ${action}`, {
      itemId,
    });
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Section: Skin category tab navigation */}
      <AdminSkinTabNavigation activeTabId={activeCategory} />

      {/* Section: Active skin category header */}
      <section className="flex flex-col gap-1">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Skin Management
        </p>
        <h1 className="text-2xl font-semibold text-foreground">
          {activeCategoryConfig.label}
        </h1>
      </section>

      <QueryStateHandler
        query={adminSkinCategoriesQuery}
        skeleton={<SkinCareAdminCardSkeleton />}
        isEmpty={activeItems.length === 0}
        errorTitle={activeCategoryConfig.errorTitle}
        emptyTitle={activeCategoryConfig.emptyTitle}
        emptyDescription={activeCategoryConfig.emptyDescription}
      >
        {/* Section: Active skin category card list */}
        <div className="flex flex-col gap-3">
          {activeItems.map((item) => (
            <SkinCareAdminCard
              key={item.id}
              item={item}
              icon={<Icon icon={activeCategoryConfig.icon} className="size-6" />}
              actions={
                <MenuDropdown
                  align="start"
                  side="bottom"
                  trigger={
                    <Button
                      variant="ghost"
                      size="sm"
                      iconOnly
                      aria-label={`Open actions for ${item.label}`}
                      className="rounded-full"
                    >
                      <Icon icon="material-symbols:more-vert" />
                    </Button>
                  }
                >
                  {/* Section: Active skin category row actions */}
                  {activeCategoryConfig.actions.map((action, index) => (
                    <Fragment key={action.id}>
                      {/* Separate destructive actions so delete/hide stays visually distinct. */}
                      {index === firstDestructiveActionIndex &&
                      firstDestructiveActionIndex > 0 ? (
                        <MenuDropdownSeparator />
                      ) : null}
                      <MenuDropdownItem
                        destructive={action.destructive}
                        icon={<Icon icon={action.icon} />}
                        onSelect={() => handleSkinAction(action.id, item.id)}
                      >
                        {action.label}
                      </MenuDropdownItem>
                    </Fragment>
                  ))}
                </MenuDropdown>
              }
            />
          ))}
        </div>
      </QueryStateHandler>
    </div>
  );
}
