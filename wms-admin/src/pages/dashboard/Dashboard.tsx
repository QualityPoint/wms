import { useFrappeDeleteDoc, useFrappeGetDocList, useFrappeUpdateDoc } from "frappe-react-sdk";
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { TableDemo } from "@/components/table/table"
import { useFrappeCreateDoc } from "frappe-react-sdk"
import type { User } from "@/types/Core/User";
import { DialogDemo } from "@/components/modal/modal";

const Dashboard = () => {
  const { data, mutate } = useFrappeGetDocList('User', {
    fields: [
      'email',
      'full_name',
      'enabled',
      'user_type',
    ],
  })

  const { createDoc } = useFrappeCreateDoc()
  const { updateDoc  } = useFrappeUpdateDoc()
  const { deleteDoc } = useFrappeDeleteDoc()  

  const handleAdd = () => {
    createDoc('User', {
      email: 'test19@example.com',
      first_name: 'Test18',
      last_name: 'User18',
      enabled: 1,
      user_type: 'System User',
      role_profile: 'Sales',
    }).then(() => {
      mutate()
    })
  }

  const handleEdit = (row: User) => {
    updateDoc('User', row.email, {
      ...row,
      last_name: 'Edited',
    }).then(() => {
      mutate()
    })
  }

  const handleDelete = (row: User) => {
    deleteDoc('User', row.email).then(() => {
      mutate()
    })
  }

  const renderAddDialog = () => {
    return (
      <DialogDemo actionButtonTitle="Add" onSubmit={()=>handleAdd()} />
    )
  }

  const renderEditDialog = (row: User) => {
    return (
      <DialogDemo actionButtonTitle="Edit" onSubmit={()=>handleEdit(row)} />
    )
  }

  const renderDeleteDialog = (row: User) => {
    return (
      <DialogDemo actionButtonTitle="Delete" onSubmit={()=>handleDelete(row)} />
    )
  }

  return (
    <div className="h-full">
       <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <TableDemo
            data={data || []}
            keyField="name"
            caption="A list of users in the system."
            addDialog={renderAddDialog()}
            editDialog={(row) => renderEditDialog(row)}
            deleteDialog={(row) => renderDeleteDialog(row)}
          />
        </div>
      </SidebarInset>
    </SidebarProvider>
    </div>
  );
};

export default Dashboard;
