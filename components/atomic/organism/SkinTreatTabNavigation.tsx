"use client";

import { cn } from "libs/util/cn";
import { mapSkinTreatLabel } from "libs/util/mapSkinTreatLabel";

import { Select } from "components/atomic/atom/Select";
import { Tabs } from "components/atomic/molecule/Tabs";

export interface SkinTreatTabNavigationOption<T extends string> {
  id: T;
  label: string;
}

export interface SkinTreatTabNavigationProps<T extends string> {
  activeTabId: T;
  options: readonly SkinTreatTabNavigationOption<T>[];
  onChange: (tabId: T) => void;
  selectId?: string;
  layoutId?: string;
  className?: string;
}

/**
 * Responsive tab navigation for skin treat categories.
 * Renders a native Select on mobile and vertical Tabs on desktop.
 * Applies a shared label map so copy is consistent across the app
 * (e.g. changing "Colors" to "Tone") without callers passing it as props.
 */
export function SkinTreatTabNavigation<T extends string>({
  activeTabId,
  options,
  onChange,
  selectId,
  layoutId,
  className,
}: Readonly<SkinTreatTabNavigationProps<T>>) {
  const mappedOptions = options.map((option) => ({
    ...option,
    label: mapSkinTreatLabel(option.label),
  }));

  return (
    <div className={cn("w-full lg:w-64 lg:shrink-0", className)}>
      <div className="lg:hidden">
        <Select
          id={selectId}
          value={activeTabId}
          onChange={(event) => onChange(event.target.value as T)}
          options={mappedOptions.map((option) => ({
            value: option.id,
            label: option.label,
          }))}
          surface="transparent"
        />
      </div>

      <div className="hidden lg:block">
        <Tabs<T>
          options={[...mappedOptions]}
          activeId={activeTabId}
          onChange={onChange}
          className="w-full lg:flex lg:flex-col"
          layoutId={layoutId}
        />
      </div>
    </div>
  );
}
