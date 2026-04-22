"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/util/cn";

export interface TabOption<T extends string> {
  id: T;
  label: string | React.ReactNode;
}

export interface TabsProps<T extends string> {
  options: TabOption<T>[];
  activeId: T;
  onChange: (id: T) => void;
  className?: string;
  tabClassName?: string;
  activeTabClassName?: string;
  /**
   * Optional layoutId for Framer Motion to animate the active indicator.
   * If not provided, a unique ID will be generated per Tabs instance.
   */
  layoutId?: string;
}

export function Tabs<T extends string>({
  options,
  activeId,
  onChange,
  className,
  tabClassName,
  activeTabClassName,
  layoutId: customLayoutId,
}: TabsProps<T>) {
  // Generate a unique ID so multiple tab components on the same page don't share the layoutId
  const reactId = React.useId();
  const layoutId = customLayoutId || reactId;

  return (
    <div
      className={cn(
        "flex w-full items-center rounded-xl bg-gray-100/80 p-1 backdrop-blur-sm dark:bg-zinc-800/80",
        className
      )}
      role="tablist"
    >
      {options.map((option) => {
        const isActive = activeId === option.id;

        return (
          <button
            key={option.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(option.id)}
            className={cn(
              "relative flex flex-1 items-center justify-center rounded-lg px-3 py-2 text-sm font-medium transition-colors outline-none",
              isActive
                ? "text-gray-900 dark:text-white"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200",
              tabClassName,
              isActive && activeTabClassName
            )}
          >
            {isActive && (
              <motion.div
                layoutId={`tabs-indicator-${layoutId}`}
                className="absolute inset-0 z-0 rounded-lg bg-white shadow-sm dark:bg-zinc-700"
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 35,
                }}
              />
            )}
            <span className="relative z-10">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
