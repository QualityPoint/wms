import type {
  Cell,
  ColumnDef,
  Header,
  HeaderGroup,
  Row,
  Table as TTable,
} from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export function CustomTable<T extends object>({
  table,
  columns,
  keyColumn,
}: {
  table: TTable<T>;
  columns: ColumnDef<T>[];
  keyColumn: string;
}) {
  return (
    <Table>
      <TableHeader className="bg-muted sticky top-0 z-10">
        {table.getHeaderGroups().map((headerGroup: HeaderGroup<T>) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header: Header<T, unknown>, index) => {
              return (
                <TableHead key={header.id + index} colSpan={header.colSpan}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody className="**:data-[slot=table-cell]:first:w-8">
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row: Row<T>, index) => (
            <TableRow
              key={`${row.original[keyColumn as keyof T]?.toString()}-${
                row.id
              }-${index}`}
            >
              {row.getVisibleCells().map((cell: Cell<T, unknown>, index) => (
                <TableCell key={cell.id + row.id + index}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
