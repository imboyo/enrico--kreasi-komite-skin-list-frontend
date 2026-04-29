"use client";

import { Icon } from "@iconify/react";

import { Button } from "@/components/atomic/atom/Button";
import {
  MenuDropdown,
  MenuDropdownItem,
  MenuDropdownSeparator,
} from "@/components/atomic/molecule/MenuDropdown";
import type { SkinCareRoutineItem } from "@/mock-backend/skin-care/get-routines";
import { cn } from "@/util/cn";

function RoutineActions({ routine }: { routine: SkinCareRoutineItem }) {
  function handleAction(action: string) {
    // Keep action wiring visible for the mock UI until real admin endpoints exist.
    console.log(`Admin routine action: ${action}`, routine);
  }

  return (
    <div onClick={(event) => event.stopPropagation()}>
      <MenuDropdown
        align="start"
        side="bottom"
        trigger={
          <Button
            variant="ghost"
            size="sm"
            iconOnly
            aria-label={`Open actions for ${routine.label}`}
            className="rounded-full"
          >
            <Icon icon="material-symbols:more-vert" />
          </Button>
        }
      >
        {/* Section: Routine row actions */}
        <MenuDropdownItem
          icon={<Icon icon="material-symbols:edit-outline-rounded" />}
          onSelect={() => handleAction("edit")}
        >
          Edit routine
        </MenuDropdownItem>
        <MenuDropdownSeparator />
        <MenuDropdownItem
          destructive
          icon={<Icon icon="material-symbols:visibility-off-outline-rounded" />}
          onSelect={() => handleAction("hide")}
        >
          Hide routine
        </MenuDropdownItem>
        <MenuDropdownItem
          destructive
          icon={<Icon icon="material-symbols:delete-outline" />}
          onSelect={() => handleAction("delete")}
        >
          Delete routine
        </MenuDropdownItem>
      </MenuDropdown>
    </div>
  );
}

export function RoutineCard({ routine }: { routine: SkinCareRoutineItem }) {
  return (
    <article className="rounded-3xl border border-[#bcbcbc] bg-background p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_6px_14px_rgba(90,90,90,0.08)] transition-all hover:border-primary/40 hover:bg-primary/5">
      {/* Section: Routine identity and actions */}
      <div className="flex items-start gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Icon icon="material-symbols:spa-outline-rounded" className="size-6" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="min-w-0 flex-1 text-base font-semibold text-foreground">
              {routine.label}
            </h2>
            <span
              className={cn(
                "shrink-0 rounded-lg border px-2.5 py-1 text-[11px] font-medium",
                routine.isChecked
                  ? "border-primary/30 bg-primary/10 text-primary"
                  : "border-border bg-muted text-muted-foreground",
              )}
            >
              {routine.isChecked ? "Default" : "Optional"}
            </span>
          </div>
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">
            {routine.description}
          </p>
        </div>

        <RoutineActions routine={routine} />
      </div>
    </article>
  );
}
