import { AppSidebar } from "@/components/app-sidebar";
import { DataTable } from "@/components/data-table";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { usersColumnsGenerator } from "@/helpers/users-col-generator";
import { useFrappeGetDocList, useFrappeUpdateDoc } from "frappe-react-sdk";
import { useMemo } from "react";
import type { User } from "../../types/Core/User";

export default function Page() {
  const { data, isLoading } = useFrappeGetDocList("User", {
    fields: [
      "name",
      "email",
      "full_name",
      "enabled",
      "user_type",
      "creation",
      "modified",
      "owner",
      "modified_by",
      "docstatus",
      "first_name",
      "last_name",
      "middle_name",
      "username",
      "phone",
      "mobile_no",
      "bio",
      "location",
      "gender",
      "idx",
    ],
  });

  const { updateDoc } = useFrappeUpdateDoc();

  const renderDataTable = useMemo(() => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center p-8">Loading...</div>
      );
    }

    return (
      <DataTable
        data={data || []}
        tableColumns={usersColumnsGenerator((item: User) => {
          updateDoc("User", item.name, item);
        })}
      />
    );
  }, [data, isLoading, updateDoc]);

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {renderDataTable}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
