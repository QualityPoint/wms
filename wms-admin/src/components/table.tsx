import type { UniqueIdentifier } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { ColumnDef, Table as TTable } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import type { User } from "../types/Core/User";
import { DraggableRow } from "./draggable-row";
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
  dataIds,
  columns,
}: {
  table: TTable<User>;
  dataIds: UniqueIdentifier[];
  columns: ColumnDef<User>[];
}) {
  return (
    <Table>
      <TableHeader className="bg-muted sticky top-0 z-10">
        {table.getHeaderGroups().map((headerGroup: any) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header: any) => {
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
          <SortableContext
            items={dataIds}
            strategy={verticalListSortingStrategy}
          >
            {table.getRowModel().rows.map((row: any) => (
              <DraggableRow key={row.name} row={row} />
            ))}
          </SortableContext>
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
