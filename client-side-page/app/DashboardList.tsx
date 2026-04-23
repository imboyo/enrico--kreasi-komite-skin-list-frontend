"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Icon } from "@iconify/react";

import { Button } from "@/components/atomic/atom/Button";
import { Checkbox } from "@/components/atomic/atom/Checkbox";
import Dialog, {
  DialogBody,
  DialogClose,
  DialogHeader,
  DialogTitle,
} from "@/components/atomic/molecule/Dialog";
import { QueryStateHandler } from "@/components/atomic/molecule/QueryStateHandler";
import { Skeleton as RoutineListSkeleton } from "@/components/domain/routine-list/Skeleton";
import { useCheckableItems } from "@/hooks/useCheckableItems";
import { APP_URL } from "@/constant";
import { cn } from "@/util/cn";
import { useRoutineCheckStore } from "@/client-side-page/home/routine-check-store";

type DashboardListItem = {
  id: string;
  label: string;
  description: string;
  isChecked: boolean;
};

type DashboardListResponse<TItem extends DashboardListItem> = {
  data: TItem[];
  meta: {
    mode: string;
  };
};

type DashboardListProps<TItem extends DashboardListItem> = {
  queryKey: string[];
  queryFn: () => Promise<DashboardListResponse<TItem>>;
  errorTitle: string;
  emptyTitle: string;
  emptyDescription: string;
};

export function DashboardList<TItem extends DashboardListItem>({
  queryKey,
  queryFn,
  errorTitle,
  emptyTitle,
  emptyDescription,
}: DashboardListProps<TItem>) {
  const query = useQuery<DashboardListResponse<TItem>>({
    queryKey,
    queryFn,
  });
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const items = query.data?.data ?? [];
  const { resolvedItems, setChecked } = useCheckableItems(items);
  const incrementCheckCount = useRoutineCheckStore((state) => state.increment);
  // Keep the dialog content in sync with the latest resolved list item state.
  const selectedItem =
    resolvedItems.find((item) => item.id === selectedItemId) ?? null;

  return (
    <div className="mt-4">
      <QueryStateHandler
        query={query}
        skeleton={<RoutineListSkeleton />}
        isEmpty={resolvedItems.length === 0}
        errorTitle={errorTitle}
        emptyTitle={emptyTitle}
        emptyDescription={emptyDescription}
      >
        <>
          {/* Checklist section */}
          <div className="space-y-3">
            {resolvedItems.map((item) => {
              const isSelected = item.id === selectedItem?.id;

              return (
                <div
                  key={item.id}
                  className={cn(
                    "rounded-[24px] border border-[#bcbcbc] bg-background shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_6px_14px_rgba(90,90,90,0.08)] transition-all",
                    // Checked state: ring + subtle secondary background
                    item.isChecked &&
                      "border-secondary/30 bg-secondary/5 ring-1 ring-secondary/20",
                    isSelected &&
                      "border-primary/50 bg-primary/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_10px_20px_rgba(90,90,90,0.12)]",
                  )}
                >
                  <div className="flex items-center gap-3 px-4 py-4">
                    <label
                      htmlFor={`${queryKey.join("-")}-${item.id}`}
                      className="flex flex-1 cursor-pointer items-center gap-3"
                    >
                      <Checkbox
                        id={`${queryKey.join("-")}-${item.id}`}
                        checked={item.isChecked}
                        aria-label={`Mark ${item.label} as completed`}
                        className="self-center"
                        onChange={(event) => {
                          setChecked(item.id, event.currentTarget.checked);
                          incrementCheckCount();
                        }}
                      />

                      <span className="flex-1 text-base font-medium text-foreground">
                        {item.label}
                      </span>
                    </label>

                    <button
                      type="button"
                      aria-label={`Open ${item.label} details`}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-background/80 text-muted-foreground transition-[background-color,transform] hover:bg-primary/5"
                      onClick={() => {
                        // Keep the detail action isolated so a tap on the arrow
                        // never toggles the checklist state by accident.
                        setSelectedItemId(item.id);
                      }}
                    >
                      <Icon
                        icon="mdi:chevron-right"
                        width={20}
                        height={20}
                        className={cn(
                          "shrink-0 transition-transform",
                          isSelected && "translate-x-0.5 text-primary",
                        )}
                      />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected item detail dialog section */}
          <Dialog
            open={selectedItem !== null}
            onOpenChange={(open) => {
              if (!open) {
                setSelectedItemId(null);
              }
            }}
            className="max-w-112"
          >
            {selectedItem ? (
              <>
                <DialogHeader>
                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-medium uppercase tracking-[0.24em] text-dialog-muted">
                      Selected Item
                    </p>
                    <DialogTitle className="text-2xl font-semibold text-dialog-foreground">
                      {selectedItem.label}
                    </DialogTitle>
                  </div>
                  <DialogClose>
                    <Icon
                      icon="material-symbols:close-rounded"
                      width={20}
                      height={20}
                      className="text-dialog-foreground/60"
                    />
                  </DialogClose>
                </DialogHeader>

                <DialogBody className="flex flex-col gap-5 pb-5 pt-0">
                  {/* Detail copy section */}
                  <p className="text-sm leading-relaxed text-dialog-muted">
                    {selectedItem.description}
                  </p>

                  {/* Detail actions section */}
                  <div className="flex flex-col gap-2">
                    <DialogClose>
                      <Link href={APP_URL.APP_CHAT} className="w-full">
                        <Button fullWidth size="lg" variant="secondary">
                          Consultation
                        </Button>
                      </Link>
                    </DialogClose>
                    <DialogClose>
                      <Link href={APP_URL.APP_ASK_AI} className="w-full">
                        <Button fullWidth size="lg">
                          Ask With AI
                        </Button>
                      </Link>
                    </DialogClose>
                  </div>
                </DialogBody>
              </>
            ) : null}
          </Dialog>
        </>
      </QueryStateHandler>
    </div>
  );
}
