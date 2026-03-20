"use client"

import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import {
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"

import * as React from "react"

import { Label } from "@/components/ui/label"

import { cn } from "@/lib/utils"

const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue | null>(null)

/**
 * ⚡ Bolt: FormField component.
 * Generic components are not easily memoized with React.memo while preserving generics.
 */
function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ ...props }: ControllerProps<TFieldValues, TName>) {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

FormField.displayName = "FormField"

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState } = useFormContext()

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const formState = useFormState({ name: fieldContext.name })
  const fieldState = getFieldState(fieldContext.name, formState)

  if (!itemContext) {
    throw new Error("useFormField should be used within <FormItem>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue | null>(null)

export type FormItemProps = React.ComponentPropsWithoutRef<"div">

/**
 * ⚡ Bolt: FormItem component optimized with React.memo.
 */
const FormItem = React.memo(
  React.forwardRef<HTMLDivElement, FormItemProps>(
    ({ className, ...props }, ref) => {
      const id = React.useId()

      return (
        <FormItemContext.Provider value={{ id }}>
          <div
            ref={ref}
            data-slot="form-item"
            className={cn("grid gap-2", className)}
            {...props}
          />
        </FormItemContext.Provider>
      )
    },
  ),
)

FormItem.displayName = "FormItem"

export type FormLabelProps = React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>

/**
 * ⚡ Bolt: FormLabel component optimized with React.memo.
 */
const FormLabel = React.memo(
  React.forwardRef<
    React.ElementRef<typeof LabelPrimitive.Root>,
    FormLabelProps
  >(({ className, ...props }, ref) => {
    const { error, formItemId } = useFormField()

    return (
      <Label
        ref={ref}
        data-slot="form-label"
        data-error={!!error}
        className={cn("font-heading", className)}
        htmlFor={formItemId}
        {...props}
      />
    )
  }),
)

FormLabel.displayName = "FormLabel"

export type FormControlProps = React.ComponentPropsWithoutRef<typeof Slot>

/**
 * ⚡ Bolt: FormControl component optimized with React.memo.
 */
const FormControl = React.memo(
  React.forwardRef<React.ElementRef<typeof Slot>, FormControlProps>(
    ({ ...props }, ref) => {
      const { error, formItemId, formDescriptionId, formMessageId } =
        useFormField()

      return (
        <Slot
          ref={ref}
          data-slot="form-control"
          id={formItemId}
          aria-describedby={
            !error
              ? `${formDescriptionId}`
              : `${formDescriptionId} ${formMessageId}`
          }
          aria-invalid={!!error}
          {...props}
        />
      )
    },
  ),
)

FormControl.displayName = "FormControl"

export type FormDescriptionProps = React.ComponentPropsWithoutRef<"p">

/**
 * ⚡ Bolt: FormDescription component optimized with React.memo.
 */
const FormDescription = React.memo(
  React.forwardRef<HTMLParagraphElement, FormDescriptionProps>(
    ({ className, ...props }, ref) => {
      const { formDescriptionId } = useFormField()

      return (
        <p
          ref={ref}
          data-slot="form-description"
          id={formDescriptionId}
          className={cn("text-sm font-base text-foreground", className)}
          {...props}
        />
      )
    },
  ),
)

FormDescription.displayName = "FormDescription"

export type FormMessageProps = React.ComponentPropsWithoutRef<"p">

/**
 * ⚡ Bolt: FormMessage component optimized with React.memo.
 */
const FormMessage = React.memo(
  React.forwardRef<HTMLParagraphElement, FormMessageProps>(
    ({ className, ...props }, ref) => {
      const { error, formMessageId } = useFormField()
      const body = error ? String(error?.message ?? "") : props.children

      if (!body) {
        return null
      }

      return (
        <p
          ref={ref}
          data-slot="form-message"
          id={formMessageId}
          className={cn("text-sm font-base text-red-500", className)}
          {...props}
        >
          {body}
        </p>
      )
    },
  ),
)

FormMessage.displayName = "FormMessage"

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}
