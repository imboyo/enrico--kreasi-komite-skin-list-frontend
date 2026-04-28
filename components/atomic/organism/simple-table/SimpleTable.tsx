/** @jsxImportSource @emotion/react */
"use client";

import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useMemo } from "react";
import { Body } from "@/components/atomic/organism/simple-table/Body";
import { Head } from "@/components/atomic/organism/simple-table/Head";

export type HeightThickness = "sm" | "md" | "lg";

export type SimpleTableProps<TColumn extends object> = {
  columns: ColumnDef<TColumn>[];
  data: TColumn[];
  stateContent?: React.ReactNode;
  columnVisibility?: Record<string, boolean>;
  onItemClick?(item: TColumn): void;
  heightThickness?: HeightThickness;
  fullBorder?: boolean;
  checkMode?: {
    checkAllValue: boolean;
    onCheckAllChange: (checked: boolean) => void;
    onItemCheckChange: (item: TColumn, checked: boolean) => void;
    checkedItems: TColumn[];
  };
};

export const SimpleTable = <T extends object>({
  columns,
  data,
  stateContent,
  columnVisibility,
  onItemClick,
  heightThickness,
  fullBorder,
  checkMode,
}: SimpleTableProps<T>) => {
  // TanStack Table returns function-heavy instances that React Compiler should not memoize.
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnVisibility,
    },
  });

  // Create a lookup for which columns have explicitly defined sizes
  const columnsWithDefinedSize = useMemo(() => {
    const sizeMap = new Set<string>();
    columns.forEach((col) => {
      // TypeScript-safe way to access accessorKey
      const accessorKey =
        "accessorKey" in col ? (col.accessorKey as string) : undefined;
      const id = col.id || accessorKey;

      if (id && col.size !== undefined) {
        sizeMap.add(id);
      }
    });
    return sizeMap;
  }, [columns]);

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-border">
      {/* Table section */}
      <table className="w-full">
        <Head
          table={table}
          columnsWithDefinedSize={columnsWithDefinedSize}
          checkMode={checkMode}
        />
        {!stateContent && (
          <Body
            table={table}
            columnsWithDefinedSize={columnsWithDefinedSize}
            onItemClick={onItemClick}
            heightThickness={heightThickness}
            fullBorder={fullBorder}
            checkMode={checkMode}
          />
        )}
      </table>

      {stateContent && (
        <>
          {/* State content section */}
          <div className="w-full overflow-hidden border-t h-[600px]">
            {stateContent}
          </div>
        </>
      )}
    </div>
  );
};
