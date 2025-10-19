import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Generic type for table data where each object key represents a column
type TableColumn<X> = keyof X;

// Generic props interface for the table component
interface TableDemoProps<X> {
  data: X[];
  caption?: string;
  keyField: TableColumn<X>;
  addDialog: React.ReactNode;
  editDialog: (row: X) => React.ReactNode;
  deleteDialog: (row: X) => React.ReactNode;
}

// Generic table component
export function TableDemo<X extends Record<string, any>>({
  data,
  caption = "A list of your recent data.",
  keyField,
  addDialog,
  editDialog,
  deleteDialog,
}: TableDemoProps<X>){
  if (!data || data.length === 0) {
    return (
      <Table>
        <TableCaption>{caption}</TableCaption>
        <TableBody>
          <TableRow>
            <TableCell colSpan={1} className="text-center text-muted-foreground">
              No data available
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }

  
  // Get column keys from the first data object
  const columns = Object.keys(data[0]) as TableColumn<X>[];

  return (
    <Table>
      <TableCaption>{caption}</TableCaption>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead
              key={String(column)}
            >
              {String(column).charAt(0).toUpperCase() + String(column).slice(1).replace(/([A-Z])/g, ' $1')}
            </TableHead>
          ))}
          <TableHead
            key="actions"
          >
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row) => (
          <TableRow key={String(row[keyField])}>
            {columns.map((column) => (
              <TableCell
                key={String(column)}
              >
                {String(row[column])}
              </TableCell>
            ))}
            <TableCell>
              {editDialog(row)}
              {deleteDialog(row)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow className="text-center">
          <TableCell colSpan={columns.length - 1}>Total</TableCell>
          <TableCell>
            {data.length}
          </TableCell>
          <TableCell>
            {addDialog}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
