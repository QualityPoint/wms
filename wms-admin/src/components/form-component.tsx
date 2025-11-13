import type { ReactNode } from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import { Controller, FormProvider, useFormContext } from "react-hook-form";
import { Button } from "./ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";

export type FormField = {
  name: string;
  label: string;
  type?:
    | "text"
    | "email"
    | "password"
    | "number"
    | "tel"
    | "select"
    | "checkbox"
    | "textarea";
  placeholder?: string;
  required?: boolean;
  checkBoxesInitialValue?: 0 | 1;
  options?: { defaultChecked?: boolean; value: string; label: string }[];
  validation?: Record<string, any>;
  autoComplete?: string;
};

type FormProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  fields: FormField[];
  onSubmit: (data: T) => void;
  submitText?: string;
  cancelText?: string;
  onCancel?: () => void;
  className?: string;
  footer?: ReactNode;
};

export function Form<T extends FieldValues>({
  form,
  fields,
  onSubmit,
  submitText = "Submit",
  cancelText = "Cancel",
  onCancel,
  className = "",
  footer,
}: FormProps<T>) {
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`space-y-4 ${className}`}
      >
        <FieldGroup>
          {fields.map((field) => (
            <FormField key={field.name} field={field} />
          ))}
        </FieldGroup>

        {footer || (
          <div className="flex justify-end gap-2">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                {cancelText}
              </Button>
            )}
            <Button type="submit">{submitText}</Button>
          </div>
        )}
      </form>
    </FormProvider>
  );
}

function FormField({ field }: { field: FormField }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const error = errors[field.name];

  return (
    <Controller
      name={field.name}
      control={control}
      rules={field.validation}
      render={({ field: { ref, ...fieldProps } }) => (
        <Field data-invalid={!!error} className="space-y-2">
          <FieldLabel htmlFor={field.name}>
            {field.label}
            {field.required && <span className="text-destructive"> *</span>}
          </FieldLabel>

          {field.type === "select" ? (
            <select
              {...fieldProps}
              id={field.name}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {field.options?.map((option, index) => {
                if (option.defaultChecked) {
                  return (
                    <option
                      key={index + option.value}
                      defaultChecked
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  );
                }
                return (
                  <option key={index + option.value} value={option.value}>
                    {option.label}
                  </option>
                );
              })}
            </select>
          ) : field.type === "checkbox" ? (
            <div className="flex items-center space-x-2">
              <input
                {...fieldProps}
                defaultChecked={field.checkBoxesInitialValue === 1}
                type="checkbox"
                id={field.name}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
            </div>
          ) : (
            <Input
              {...fieldProps}
              id={field.name}
              type={field.type || "text"}
              placeholder={field.placeholder}
              autoComplete={field.autoComplete}
              aria-invalid={!!error}
            />
          )}

          {error && <FieldError errors={[error]} />}
        </Field>
      )}
    />
  );
}
