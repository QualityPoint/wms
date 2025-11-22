import { AppSidebar } from "@/components/app-sidebar";
import { DataTable } from "@/components/data-table";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { usersColumnsGenerator } from "@/helpers/users-col-generator";
import { IconFidgetSpinner } from "@tabler/icons-react";
import { useFrappeGetDocList } from "frappe-react-sdk";
import type { FormField } from "../../components/form-component";
import { customersSchema } from "../../schema/customer-schema";
import type { Customer } from "../../types/Selling/Customer";

export default function Page() {
  const { data, isLoading } = useFrappeGetDocList<Customer>(
    "Customer",
    {
      fields: [
        "name",
        "email_id",
        "customer_name",
        "creation",
        "modified",
        "owner",
        "modified_by",
        "docstatus",
        "customer_name_in_arabic",
        "customer_type",
        "is_group",
        "parent_customer",
        "customer_group",
        "territory",
        "gender",
        "lead_name",
        "opportunity_name",
        "prospect_name",
        "account_manager",
        "image",
        "default_currency",
        "default_bank_account",
        "default_price_list",
        "is_internal_customer",
        "represents_company",
        "companies",
        "custom_vat_registration_number",
        "custom_additional_ids",
        "market_segment",
        "industry",
        "customer_pos_id",
        "website",
        "language",
        "customer_details",
        "customer_primary_address",
        "primary_address",
        "customer_primary_contact",
        "mobile_no",
        "email_id",
        "gender",
      ],
    },
    "customer_list"
  );

  const formFields: FormField[] = [
    {
      name: "customer_name",
      label: "Customer Name",
      type: "text",
      placeholder: "Doe",
      autoComplete: "name",
    },
    {
      name: "customer_name_in_arabic",
      label: "Customer Name in Arabic",
      type: "text",
      placeholder: "John",
      autoComplete: "name",
    },
    {
      name: "customer_type",
      label: "Customer Type",
      type: "text",
      placeholder: "John Doe",
      autoComplete: "name",
    },
    {
      name: "customer_group",
      label: "Customer Group",
      type: "text",
      placeholder: "john.doe@example.com",
      autoComplete: "email",
    },
    {
      name: "territory",
      label: "Territory",
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
          PageName="Customers"
          docType="Customer"
          formSchema={customersSchema}
          keycolumn="name"
          cacheKey="customer_list"
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
                  tableColumns={usersColumnsGenerator<Customer>(
                    data || [],
                    "customer_list",
                    "Customer",
                    "name",
                    customersSchema,
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
