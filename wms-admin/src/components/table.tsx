import type { UniqueIdentifier } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type {
  ColumnDef,
  Header,
  HeaderGroup,
  Row,
  Table as TTable,
} from "@tanstack/react-table";
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
  console.log(
    table.initialState,
    dataIds,
    columns,
    "from table",
    "dataIds",
    "columns"
  );
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
          <SortableContext
            items={dataIds}
            strategy={verticalListSortingStrategy}
          >
            {table.getRowModel().rows.map((row: Row<User>) => (
              <DraggableRow key={`${row.original.name}-${row.id}`} row={row} />
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
