/** @jsxImportSource @emotion/react */
import { Cell, flexRender, Table } from "@tanstack/react-table";
import { css, SerializedStyles } from "@emotion/react";
import React from "react";
import { Checkbox } from "@/components/atomic/atom/Checkbox";
import {
  HeightThickness,
  SimpleTableProps,
} from "@/components/atomic/organism/simple-table/SimpleTable";
import { cn } from "@/util/cn";
import _ from "lodash";

interface Props<T extends object> {
  table: Table<T>;
  columnsWithDefinedSize: Set<string>;
  onItemClick?: (item: T) => void;
  heightThickness?: HeightThickness;
  fullBorder?: boolean;
  checkMode?: SimpleTableProps<T>["checkMode"];
}

export const Body = <T extends object>({
  table,
  columnsWithDefinedSize,
  onItemClick,
  heightThickness = "md",
  fullBorder = false,
  checkMode,
}: Props<T>) => {
  const handleRowClick = (row: T) => {
    if (onItemClick) {
      onItemClick(row);
    }
  };

  const getCellStyle = <T,>(
    cell: Cell<T, unknown>,
    index: number,
  ): SerializedStyles => {
    const hasSizeDefined = columnsWithDefinedSize.has(cell.column.id);
    const minSize = cell.column.columnDef.minSize;
    const size = cell.column.getSize();
    const firstColumn = index === 0;

    const fullBorderStyle =
      fullBorder && !firstColumn
        ? { borderLeft: "1px solid var(--border)" }
        : {};

    if (hasSizeDefined) {
      return css({
        width: `${size}px`,
        flexShrink: 0,
        ...fullBorderStyle,
      });
    }

    return css({
      flex: "1 1 auto",
      ...(minSize ? { minWidth: `${minSize}px` } : {}),
      alignItems: "center",
      ...fullBorderStyle,
    });
  };

  const rowStyle = cn(
    "flex w-full border-t border-border/70 text-foreground transition-colors duration-150",
    {
      "cursor-pointer hover:bg-primary/5": onItemClick,
      "py-2.5": heightThickness === "sm",
      "py-4": heightThickness === "md",
      "py-5": heightThickness === "lg",
    },
  );

  return (
    <tbody>
      {table.getRowModel().rows.map((row) => (
        <tr
          key={row.id}
          className={rowStyle}
          onClick={() => handleRowClick(row.original as T)}
        >
          {/* Selection cell section */}
          {checkMode && (
            <td
              css={css({
                width: "48px",
                flexShrink: 0,
                borderRight: "1px solid color-mix(in srgb, var(--border) 70%, transparent)",
              })}
              className="flex items-center justify-center px-4"
              onClick={(event) => event.stopPropagation()}
            >
              <Checkbox
                aria-label="Select row"
                onChange={(e) =>
                  checkMode.onItemCheckChange(row.original, e.target.checked)
                }
                checked={checkMode.checkedItems.some((checkedItem) =>
                  _.isEqual(checkedItem, row.original),
                )}
              />
            </td>
          )}

          {/* Data cells section */}
          {row.getVisibleCells().map((cell, index) => (
            <td
              key={cell.id}
              css={getCellStyle(cell, index)}
              className={cn(
                "flex items-center whitespace-normal text-wrap break-words px-4 text-sm leading-6",
              )}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};
