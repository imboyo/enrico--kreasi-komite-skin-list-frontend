/** @jsxImportSource @emotion/react */
import { flexRender, Table } from "@tanstack/react-table";
import { css } from "@emotion/react";
import React from "react";
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
    <thead className="bg-table">
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id} className="flex w-full py-3">
          {/* ✅ Add a checkbox header when checkMode is active */}
          {checkMode && (
            <th
              className="relative flex items-center justify-center px-4 text-start align-middle font-semibold text-table-foreground"
              css={css({
                width: "48px",
                flexShrink: 0,
                borderRight: "1px solid var(--border)",
              })}
            >
              <input
                type="checkbox"
                className="cursor-pointer accent-primary"
                onChange={(e) => checkMode.onCheckAllChange(e.target.checked)}
                checked={checkMode.checkAllValue}
              />
            </th>
          )}

          {headerGroup.headers.map((column, index) => {
            const hasSizeDefined = columnsWithDefinedSize.has(column.id);
            const isLastColumn = index === headerGroup.headers.length - 1;

            return (
              <th
                key={column.id}
                colSpan={column.colSpan}
                className="relative flex items-center px-4 text-start align-middle font-semibold text-table-foreground"
                css={css({
                  ...(hasSizeDefined
                    ? { width: `${column.getSize()}px`, flexShrink: 0 }
                    : { flex: "1 1 auto" }),
                  ...(isLastColumn
                    ? { borderRight: "none" }
                    : { borderRight: "1px solid var(--border)" }),
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
