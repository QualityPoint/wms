import { z } from "zod";

import { useIsMobile } from "@/hooks/use-mobile";

import { useFrappeUpdateDoc, useSWRConfig } from "frappe-react-sdk";
import { useForm, type DefaultValues } from "react-hook-form";
import type { User } from "../types/Core/User";
import { Form, type FormField } from "./form-component";
import { Button } from "./ui/button";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";

export function EditUserDetails<T extends object>({
  item,
  docType,
  formSchema,
  keycolumn,
  cacheKey,
  formFields,
}: {
  item: T;
  docType: string;
  formSchema: z.ZodType<T>;
  keycolumn: string;
  cacheKey: string;
  formFields: FormField[];
}) {
  const isMobile = useIsMobile();

  // Create default values by mapping schema shape to item values
  const defaultValues = (
    formSchema instanceof z.ZodObject
      ? Object.fromEntries(
          Object.entries(formSchema.shape).map(([key]) => [
            key,
            item[key as keyof T] ?? "",
          ])
        )
      : {}
  ) as DefaultValues<z.infer<typeof formSchema>>;

  const UserForm = useForm<z.infer<typeof formSchema>>({
    defaultValues,
  });

  const { updateDoc } = useFrappeUpdateDoc<User>();

  const { mutate: globalMutate } = useSWRConfig();

  const onSubmitRowData = (formDataToUpdate: z.infer<typeof formSchema>) => {
    updateDoc(docType, item[keycolumn as keyof T] as string, {
      ...formSchema.parse(formDataToUpdate),
    })
      .then(() => {
        console.log(`User ${item[keycolumn as keyof T]} updated successfully`);
        globalMutate(cacheKey);
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
            className="wrap-anywhere line-clamp-2 break-all h-auto text-ellipsis text-foreground w-fit px-0"
          >
            <>{item[keycolumn as keyof T]}</>
          </Button>
        </DrawerTrigger>
        <DrawerDescription>
          {
            // This is to avoid user aria label console warning
          }
        </DrawerDescription>
        <DrawerContent>
          <DrawerHeader className="gap-1">
            <DrawerTitle>
              Edit User <>{item[keycolumn as keyof T]}</>
            </DrawerTitle>
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
