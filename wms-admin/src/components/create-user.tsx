import { z } from "zod";

import { useIsMobile } from "@/hooks/use-mobile";

import { useFrappeCreateDoc, useSWRConfig } from "frappe-react-sdk";
import { useForm } from "react-hook-form";
import { userSchema } from "../schema/users-schema";
import type { User } from "../types/Core/User";
import { Form } from "./form-component";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";

export function CreateUser({}: {}) {
  const isMobile = useIsMobile();

  const UserForm = useForm<z.infer<typeof userSchema>>({
    defaultValues: {
      name: "",
      email: "",
      creation: "",
      modified: "",
      owner: "",
      docstatus: 0,
      first_name: "",
      last_name: "",
      full_name: "",
    },
  });

  const formFields = [
    {
      name: "email",
      label: "Email",
      type: "email" as const,
      placeholder: "user@example.com",
      required: true,
      validation: {
        required: "Email is required",
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Invalid email address",
        },
      },
      autoComplete: "email",
    },
    {
      name: "first_name",
      label: "First Name",
      type: "text" as const,
      placeholder: "John",
      autoComplete: "name",
    },
    {
      name: "last_name",
      label: "Last Name",
      type: "text" as const,
      placeholder: "Doe",
      autoComplete: "name",
    },
    {
      name: "user_type",
      label: "User Type",
      type: "select" as const,
      options: [
        { value: "", label: "Select User Type" },
        { value: "Website User", label: "Website User" },
        { value: "System User", label: "System User" },
      ],
    },
    {
      name: "enabled",
      label: "Account Enabled",
      type: "checkbox" as const,
    },
  ];

  const { createDoc } = useFrappeCreateDoc<Partial<User>>();
  const { mutate: globalMutate } = useSWRConfig();

  const onSubmitRowData = (addedUser: z.infer<typeof userSchema>) => {
    const {
      name,
      email,
      first_name,
      last_name,
      full_name,
      enabled,
      user_type,
    } = addedUser;

    createDoc("User", {
      email,
      first_name,
      last_name,
      full_name,
      enabled,
      user_type,
    })
      .then(() => {
        console.log(`User ${name} created successfully`);
        globalMutate("users_list");
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      });
  };

  return (
    <div className="cursor-pointer whitespace-normal px-2 line-clamp-2 line-break-anywhere">
      <Drawer direction={isMobile ? "bottom" : "right"}>
        <DrawerTrigger asChild>
          <Button
            variant="link"
            className="text-foreground w-fit px-0 whitespace-normal text-left"
          >
            Create User
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="gap-1">
            <DrawerTitle>Create User</DrawerTitle>
          </DrawerHeader>
          <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
            <Form
              form={UserForm}
              fields={formFields}
              onSubmit={(data) => onSubmitRowData(data)}
              submitText="Save Changes"
              cancelText="Cancel"
              footer={
                <DrawerFooter className="px-0">
                  <Button type="submit" className="w-full">
                    Save Changes
                  </Button>
                  <DrawerClose asChild>
                    <Button type="button" variant="outline" className="w-full">
                      Cancel
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              }
            />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
