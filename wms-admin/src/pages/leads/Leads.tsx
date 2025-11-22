import { AppSidebar } from "@/components/app-sidebar";
import { DataTable } from "@/components/data-table";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { usersColumnsGenerator } from "@/helpers/users-col-generator";
import { IconFidgetSpinner } from "@tabler/icons-react";
import { useFrappeGetDocList } from "frappe-react-sdk";
import type { FormField } from "../../components/form-component";
import { leadSchema } from "../../schema/leads-schema";
import type { Lead } from "../../types/CRM/Lead";

export default function Page() {
  const { data, isLoading } = useFrappeGetDocList<Lead>(
    "Lead",
    {
      fields: [
        "name",
        "email_id",
        "lead_name",
        "creation",
        "modified",
        "owner",
        "modified_by",
        "docstatus",
        "first_name",
        "last_name",
        "phone",
        "mobile_no",
        "gender",
      ],
    },
    "leads_list"
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
      name: "lead_name",
      label: "Lead Name",
      type: "text",
      placeholder: "John Doe",
      autoComplete: "name",
    },
    {
      name: "email_id",
      label: "Email ID",
      type: "text",
      placeholder: "john.doe@example.com",
      autoComplete: "email",
    },
    {
      name: "phone",
      label: "Phone",
      type: "text",
      placeholder: "1234567890",
      autoComplete: "tel",
    },
    {
      name: "mobile_no",
      label: "Mobile No",
      type: "text",
      placeholder: "1234567890",
      autoComplete: "tel",
    },
    {
      name: "gender",
      label: "Gender",
      type: "select",
      options: [
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" },
        { value: "Other", label: "Other" },
      ],
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
        <SiteHeader
          PageName="Leads"
          docType="Lead"
          formSchema={leadSchema}
          keycolumn="name"
          cacheKey="leads_list"
          formFields={formFields}
        />
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
                  tableColumns={usersColumnsGenerator<Lead>(
                    data || [],
                    "leads_list",
                    "Lead",
                    "name",
                    leadSchema,
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
