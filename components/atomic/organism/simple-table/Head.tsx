/** @jsxImportSource @emotion/react */
import { flexRender, Table } from "@tanstack/react-table";
import { css } from "@emotion/react";
import React from "react";
import { Checkbox } from "@/components/atomic/atom/Checkbox";
import { SimpleTableProps } from "@/components/atomic/organism/simple-table/SimpleTable";

interface Props<T extends object> {
  table: Table<T>;
  columnsWithDefinedSize: Set<string>;
  checkMode?: SimpleTableProps<T>["checkMode"];
}

export const Head = <T extends object>({
  table,
  columnsWithDefinedSize,
  checkMode,
}: Props<T>) => {
  return (
    <thead>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr
          key={headerGroup.id}
          className="flex w-full bg-muted/70 py-3 shadow-[inset_0_-1px_0_rgba(182,182,182,0.7)]"
        >
          {/* Selection header section */}
          {checkMode && (
            <th
              className="relative flex items-center justify-center px-4 text-start align-middle"
              css={css({
                width: "48px",
                flexShrink: 0,
                borderRight: "1px solid color-mix(in srgb, var(--border) 70%, transparent)",
              })}
            >
              <Checkbox
                aria-label="Select all rows"
                onChange={(e) => checkMode.onCheckAllChange(e.target.checked)}
                checked={checkMode.checkAllValue}
              />
            </th>
          )}

          {/* Column header section */}
          {headerGroup.headers.map((column, index) => {
            const hasSizeDefined = columnsWithDefinedSize.has(column.id);
            const isLastColumn = index === headerGroup.headers.length - 1;

            return (
              <th
                key={column.id}
                colSpan={column.colSpan}
                className="relative flex items-center px-4 text-start align-middle text-xs font-semibold uppercase text-muted-foreground"
                css={css({
                  ...(hasSizeDefined
                    ? { width: `${column.getSize()}px`, flexShrink: 0 }
                    : { flex: "1 1 auto" }),
                  ...(isLastColumn
                    ? { borderRight: "none" }
                    : {
                        borderRight:
                          "1px solid color-mix(in srgb, var(--border) 70%, transparent)",
                      }),
                })}
              >
                {column.isPlaceholder
                  ? null
                  : flexRender(
                      column.column.columnDef.header,
                      column.getContext(),
                    )}
              </th>
            );
          })}
        </tr>
      ))}
    </thead>
  );
};
