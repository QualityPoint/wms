import { z } from "zod";

import { useIsMobile } from "@/hooks/use-mobile";

import { useFrappeCreateDoc, useSWRConfig } from "frappe-react-sdk";
import { useForm } from "react-hook-form";
import { userSchema } from "../schema/users-schema";
import type { User } from "../types/Core/User";
import { Form } from "./form-component";
import { Button } from "./ui/button";

export function CreateUser({}: {}) {
  const isMobile = useIsMobile();

  const UserForm = useForm<z.infer<typeof userSchema>>({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      mobile_no: "",
      new_password: "",
    },
  });

  const formFields = [
    {
      name: "first_name",
      label: "First Name",
      type: "text" as const,
      placeholder: "Enter first name",
      required: true,
      validation: {
        required: "First name is required",
        minLength: {
          value: 2,
          message: "First name must be at least 2 characters",
        },
      },
      autoComplete: "given-name",
    },
    {
      name: "last_name",
      label: "Last Name",
      type: "text" as const,
      placeholder: "Enter last name",
      required: true,
      validation: {
        required: "Last name is required",
        minLength: {
          value: 2,
          message: "Last name must be at least 2 characters",
        },
      },
      autoComplete: "family-name",
    },
    {
      name: "email",
      label: "Email",
      type: "email" as const,
      placeholder: "Enter email address",
      required: true,
      validation: {
        required: "Email is required",
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Please enter a valid email address",
        },
      },
      autoComplete: "email",
    },
    {
      name: "mobile_no",
      label: "Mobile No",
      type: "tel" as const,
      placeholder: "Enter mobile number",
      required: true,
      validation: {
        required: "Mobile number is required",
        pattern: {
          value: /^[0-9\-+\s()]*$/,
          message: "Please enter a valid mobile number",
        },
        minLength: {
          value: 8,
          message: "Mobile number must be at least 8 digits",
        },
      },
      autoComplete: "tel",
    },
    {
      name: "new_password",
      label: "Password",
      type: "password" as const,
      placeholder: "Create a password",
      required: true,
      validation: {
        required: "Password is required",
        minLength: {
          value: 8,
          message: "Password must be at least 8 characters",
        },
      },
      autoComplete: "new-password",
    },
  ];

  const { createDoc } = useFrappeCreateDoc<Partial<User>>();
  const { mutate: globalMutate } = useSWRConfig();

  const onSubmitRowData = (addedUser: z.infer<typeof userSchema>) => {
    const { first_name, last_name, email, mobile_no, new_password } = addedUser;

    createDoc("User", {
      email,
      first_name,
      last_name,
      full_name: `${first_name} ${last_name}`.trim(),
      mobile_no,
      new_password,
      send_welcome_email: 0, // Don't send welcome email as we're setting the password
      enabled: 1, // Enable the user by default
      user_type: "System User", // Set default user type
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
      <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
        <Form
          form={UserForm}
          fields={formFields}
          onSubmit={(data) => onSubmitRowData(data)}
          footer={
            <>
              <Button type="submit" className="w-full">
                Save Changes
              </Button>
              <Button type="button" variant="outline" className="w-full">
                Cancel
              </Button>
            </>
          }
        />
      </div>
    </div>
  );
}
