import { DragHandle } from "@/components/drag-handle";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconDotsVertical } from "@tabler/icons-react";
import type { ColumnDef } from "@tanstack/react-table";
import { TableCellViewer } from "../components/table-cell-viewer";
import { Button } from "../components/ui/button";
import type { User } from "../types/Core/User";

export const usersColumnsGenerator = (
  submitRowData: (item: User) => void
): ColumnDef<User>[] => [
  {
    id: "drag",
    header: () => null,
    cell: ({ cell }) => <DragHandle id={cell.row.index} />,
  },
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "ID",
    cell: ({ row }) => {
      return (
        <TableCellViewer
          onSubmitRowData={(item: User) => submitRowData(item)}
          item={row.original}
        />
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "user_type",
    header: "User Type",
    cell: ({ row }) => <div>{row.original.user_type}</div>,
  },
  {
    accessorKey: "enabled",
    header: "Enabled",
    cell: ({ row }) => <div>{row.original.enabled}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div>{row.original.email}</div>,
  },
  {
    accessorKey: "full_name",
    header: "Full Name",
    cell: ({ row }) => <div>{row.original.full_name}</div>,
  },
  {
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
            size="icon"
          >
            <IconDotsVertical />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem
            variant="destructive"
            className="cursor-pointer"
            onClick={() => {}}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
