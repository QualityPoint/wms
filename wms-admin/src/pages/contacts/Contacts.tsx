import { AppSidebar } from "@/components/app-sidebar";
import { DataTable } from "@/components/data-table";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { usersColumnsGenerator } from "@/helpers/users-col-generator";
import { IconFidgetSpinner } from "@tabler/icons-react";
import { useFrappeGetDocList } from "frappe-react-sdk";
import type { FormField } from "../../components/form-component";
import { userSchema } from "../../schema/users-schema";
import type { User } from "../../types/Core/User";

export default function Page() {
  const { data, isLoading } = useFrappeGetDocList<User>(
    "User",
    {
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
    },
    "users_list"
  );

  const formFields: FormField[] = [
    {
      name: "last_name",
      label: "Last Name",
      type: "text",
      placeholder: "Doe",
      autoComplete: "name",
    },
    {
      name: "first_name",
      label: "First Name",
      type: "text",
      placeholder: "John",
      autoComplete: "name",
    },
    {
      name: "user_type",
      label: "User Type",
      type: "select",
      options: [
        {
          value:
            data?.find((item) => item.name === "user_type")?.user_type || "",
          label:
            data?.find((item) => item.name === "user_type")?.user_type ||
            "Select user type",
          defaultChecked: true,
        },
        ...(data?.find((item) => item.name === "user_type")?.user_type !==
        "Website User"
          ? [{ value: "Website User", label: "Website User" }]
          : []),
        ...(data?.find((item) => item.name === "user_type")?.user_type !==
        "System User"
          ? [{ value: "System User", label: "System User" }]
          : []),
      ],
    },
    {
      name: "enabled",
      label: "Account Enabled",
      type: "checkbox",
      checkBoxesInitialValue: data?.find((item) => item.name === "enabled")
        ?.enabled,
    },
  ];

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
        <SiteHeader PageName="Contacts" />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {isLoading ? (
                <div className="flex items-center justify-center p-8">
                  <IconFidgetSpinner /> ...
                </div>
              ) : (
                <DataTable
                  data={data || []}
                  keyColumn="name"
                  tableColumns={usersColumnsGenerator<User>(
                    data || [],
                    "users_list",
                    "User",
                    "name",
                    userSchema,
                    formFields
                  )}
                />
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
