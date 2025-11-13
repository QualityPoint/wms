import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconDotsVertical } from "@tabler/icons-react";
import type { ColumnDef } from "@tanstack/react-table";
import { useFrappeDeleteDoc, useSWRConfig } from "frappe-react-sdk";
import { z } from "zod";
import { EditUserDetails } from "../components/edit-user-details";
import type { FormField } from "../components/form-component";
import { Button } from "../components/ui/button";

const createFieldsFromData = <T extends object>(data: T[]) => {
  return Object.keys(data[0] || {}).map((key) => ({
    accessorKey: key,
    header: key,
  }));
};

export const usersColumnsGenerator = <T extends object>(
  data: T[],
  cacheKey: string,
  docType: string,
  idField: string,
  formSchema: z.ZodType<T>,
  formFields: FormField[]
): ColumnDef<T>[] => [
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
    accessorKey: idField,
    header: "ID",
    cell: ({ row }) => (
      <EditUserDetails<T>
        item={row.original}
        docType={docType}
        formSchema={formSchema}
        keycolumn={idField}
        cacheKey={cacheKey}
        formFields={formFields}
      />
    ),
    enableHiding: false,
  },
  ...createFieldsFromData(data),
  {
    id: "actions",
    cell: ({ row }) => {
      const { deleteDoc } = useFrappeDeleteDoc();
      const { mutate: globalMutate } = useSWRConfig();

      return (
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
              onClick={() =>
                deleteDoc(docType, (row.original as any)?.[idField]).then(() =>
                  globalMutate(cacheKey)
                )
              }
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
