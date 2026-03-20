import * as React from "react"

import { cn } from "@/lib/utils"

export type TableProps = React.ComponentPropsWithoutRef<"table">

/**
 * ⚡ Bolt: Table component optimized with React.memo and forwardRef.
 */
const Table = React.memo(
  React.forwardRef<HTMLTableElement, TableProps>(
    ({ className, ...props }, ref) => (
      <div className="relative w-full overflow-auto">
        <table
          ref={ref}
          data-slot="table"
          className={cn(
            "w-full caption-bottom border-2 border-border text-sm",
            className,
          )}
          {...props}
        />
      </div>
    ),
  ),
)

Table.displayName = "Table"

export type TableHeaderProps = React.ComponentPropsWithoutRef<"thead">

/**
 * ⚡ Bolt: TableHeader component optimized with React.memo and forwardRef.
 */
const TableHeader = React.memo(
  React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
    ({ className, ...props }, ref) => (
    <thead
      ref={ref}
      data-slot="table-header"
      className={cn("[&_tr]:border-b-2 [&_tr]:border-border", className)}
      {...props}
    />
  )),
)

TableHeader.displayName = "TableHeader"

export type TableBodyProps = React.ComponentPropsWithoutRef<"tbody">

/**
 * ⚡ Bolt: TableBody component optimized with React.memo and forwardRef.
 */
const TableBody = React.memo(
  React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
    ({ className, ...props }, ref) => (
    <tbody
      ref={ref}
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )),
)

TableBody.displayName = "TableBody"

export type TableFooterProps = React.ComponentPropsWithoutRef<"tfoot">

/**
 * ⚡ Bolt: TableFooter component optimized with React.memo and forwardRef.
 */
const TableFooter = React.memo(
  React.forwardRef<HTMLTableSectionElement, TableFooterProps>(
    ({ className, ...props }, ref) => (
    <tfoot
      ref={ref}
      data-slot="table-footer"
      className={cn(
        "border-t-2 border-border bg-main font-base text-main-foreground last:[&>tr]:border-b-0",
        className,
      )}
      {...props}
    />
  )),
)

TableFooter.displayName = "TableFooter"

export type TableRowProps = React.ComponentPropsWithoutRef<"tr">

/**
 * ⚡ Bolt: TableRow component optimized with React.memo and forwardRef.
 */
const TableRow = React.memo(
  React.forwardRef<HTMLTableRowElement, TableRowProps>(
    ({ className, ...props }, ref) => (
      <tr
        ref={ref}
        data-slot="table-row"
        className={cn(
          "border-b-2 border-border transition-colors text-main-foreground bg-main font-base data-[state=selected]:bg-secondary-background data-[state=selected]:text-main-foreground",
          className,
        )}
        {...props}
      />
    ),
  ),
)

TableRow.displayName = "TableRow"

export type TableHeadProps = React.ComponentPropsWithoutRef<"th">

/**
 * ⚡ Bolt: TableHead component optimized with React.memo and forwardRef.
 */
const TableHead = React.memo(
  React.forwardRef<HTMLTableCellElement, TableHeadProps>(
    ({ className, ...props }, ref) => (
      <th
        ref={ref}
        data-slot="table-head"
        className={cn(
          "h-12 px-4 text-left align-middle font-heading text-main-foreground [&:has([role=checkbox])]:pr-0",
          className,
        )}
        {...props}
      />
    ),
  ),
)

TableHead.displayName = "TableHead"

export type TableCellProps = React.ComponentPropsWithoutRef<"td">

/**
 * ⚡ Bolt: TableCell component optimized with React.memo and forwardRef.
 */
const TableCell = React.memo(
  React.forwardRef<HTMLTableCellElement, TableCellProps>(
    ({ className, ...props }, ref) => (
      <td
        ref={ref}
        data-slot="table-cell"
        className={cn(
          "p-4 align-middle [&:has([role=checkbox])]:pr-0",
          className,
        )}
        {...props}
      />
    ),
  ),
)

TableCell.displayName = "TableCell"

export type TableCaptionProps = React.ComponentPropsWithoutRef<"caption">

/**
 * ⚡ Bolt: TableCaption component optimized with React.memo and forwardRef.
 */
const TableCaption = React.memo(
  React.forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
    ({ className, ...props }, ref) => (
    <caption
      ref={ref}
      data-slot="table-caption"
      className={cn("mt-4 text-sm text-foreground font-base", className)}
      {...props}
    />
  )),
)

TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
