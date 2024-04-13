"use client";

import { KeyboardEventHandler, forwardRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useFormStatus } from "react-dom";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { FormErrors } from "./form-errors";

interface FormTextareaProps {
  id: string;
  label?: string;
  placeholder: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  defaultValue?: string;
  errors?: Record<string, string[] | undefined>;
  onBlur?: () => void;
  onClick?: () => void;
  onKeydown?: KeyboardEventHandler<HTMLTextAreaElement> | undefined;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  (
    {
      id,
      label,
      placeholder,
      required,
      disabled,
      className,
      defaultValue,
      errors,
      onBlur,
      onClick,
      onKeydown,
    },
    ref
  ) => {
    const { pending } = useFormStatus();

    return (
      <div className="space-y-2 w-full">
        <div className="space-y-1 w-full">
          {label ? (
            <Label
              htmlFor={id}
              className="font-semibold text-neutral-200 text-lg"
            >
              {label}
            </Label>
          ) : null}
          <Textarea
            ref={ref}
            id={id}
            // ! if we lack of the name that will get null value
            name={id}
            placeholder={placeholder}
            onKeyDown={onKeydown}
            disabled={disabled || pending}
            required={required}
            onBlur={onBlur}
            className={cn(
              "resize-none focus-visible:right-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm",
              className
            )}
            defaultValue={defaultValue}
            area-aria-describedby={`${id}-error`}
          />
        </div>
        <FormErrors errors={errors} id={id} />
      </div>
    );
  }
);

FormTextarea.displayName = "FormTextArea";
