import type {
  Cell,
  ColumnDef,
  Header,
  HeaderGroup,
  Row,
  Table as TTable,
} from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import type { User } from "../types/Core/User";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export function CustomTable({
  table,
  columns,
}: {
  table: TTable<User>;
  columns: ColumnDef<User>[];
}) {
  return (
    <Table>
      <TableHeader className="bg-muted sticky top-0 z-10">
        {table.getHeaderGroups().map((headerGroup: HeaderGroup<User>) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header: Header<User, unknown>) => {
              return (
                <TableHead key={header.id} colSpan={header.colSpan}>
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
          table.getRowModel().rows.map((row: Row<User>) => (
            <TableRow key={`${row.original.name}-${row.id}`}>
              {row.getVisibleCells().map((cell: Cell<User, unknown>) => (
                <TableCell key={cell.id}>
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
