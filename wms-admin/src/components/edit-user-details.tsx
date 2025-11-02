import { z } from "zod";

import { useIsMobile } from "@/hooks/use-mobile";

import { useFrappeUpdateDoc, useSWRConfig } from "frappe-react-sdk";
import { useForm } from "react-hook-form";
import { userSchema } from "../schema/users-schema";
import type { User } from "../types/Core/User";
import { Form, type FormField } from "./form-component";
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

export function EditUserDetails({
  item,
}: {
  item: z.infer<typeof userSchema>;
}) {
  const isMobile = useIsMobile();

  const UserForm = useForm<z.infer<typeof userSchema>>({
    defaultValues: {
      name: item.name,
      first_name: item.first_name,
      last_name: item.last_name,
      user_type: item.user_type,
      enabled: item.enabled,
    },
  });

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
          value: item.user_type || "",
          label: item.user_type || "Select user type",
          defaultChecked: true,
        },
        ...(item.user_type !== "Website User"
          ? [{ value: "Website User", label: "Website User" }]
          : []),
        ...(item.user_type !== "System User"
          ? [{ value: "System User", label: "System User" }]
          : []),
      ],
    },
    {
      name: "enabled",
      label: "Account Enabled",
      type: "checkbox",
      checkBoxesInitialValue: item.enabled,
    },
  ];

  const { updateDoc } = useFrappeUpdateDoc<User>();

  const { mutate: globalMutate } = useSWRConfig();

  const onSubmitRowData = (formDataToUpdate: z.infer<typeof userSchema>) => {
    const {
      name,
      email,
      first_name,
      last_name,
      full_name,
      enabled,
      user_type,
    } = formDataToUpdate;

    updateDoc("User", name, {
      name,
      email,
      first_name,
      last_name,
      full_name,
      enabled,
      user_type,
    })
      .then(() => {
        console.log(`User ${name} updated successfully`);
        globalMutate("users_list");
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  return (
    <div className="cursor-pointer px-2">
      <Drawer direction={isMobile ? "bottom" : "right"}>
        <DrawerTrigger asChild>
          <Button
            variant="link"
            className="wrap-anywhere line-clamp-2 break-all h-auto text-ellipsis text-foreground w-fit px-0 whitespace-normal text-left"
          >
            Edit {item.name}
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="gap-1">
            <DrawerTitle>Edit User {item.name}</DrawerTitle>
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
