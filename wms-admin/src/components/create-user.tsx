import { z } from "zod";

import { useFrappeCreateDoc, useSWRConfig } from "frappe-react-sdk";
import { useForm, type DefaultValues } from "react-hook-form";
import { Form, type FormField } from "./form-component";
import { Button } from "./ui/button";

export function CreateUser<T extends object>({
  docType,
  formSchema,
  keycolumn,
  cacheKey,
  formFields,
}: {
  docType: string;
  formSchema: z.ZodType<T>;
  keycolumn: string;
  cacheKey: string;
  formFields: FormField[];
}) {
  const UserForm = useForm<z.infer<typeof formSchema>>({
    defaultValues: {} as DefaultValues<z.infer<typeof formSchema>>,
  });

  const { createDoc } = useFrappeCreateDoc<T>();

  const { mutate: globalMutate } = useSWRConfig();

  const onSubmitRowData = (data: z.infer<typeof formSchema>) => {
    createDoc(docType, {
      ...data,
      send_welcome_email: 0, // Disable welcome email
    })
      .then(() => {
        console.log(`User ${data[keycolumn as keyof T]} created successfully`);
        globalMutate(cacheKey);
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      });
  };

  return (
    <div className="cursor-pointer whitespace-normal px-2 line-clamp-2 line-break-anywhere overflow-y-auto">
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
