/** biome-ignore-all lint/correctness/noChildrenProp: tanstack router core */
import type { ComponentProps } from "react";
import isMobilePhone from "validator/es/lib/isMobilePhone";
import { z } from "zod";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export const contactSchema = z.object({
  email: z.email(),
  message: z.string().min(8).max(1000),
  name: z.string().min(2).max(100),
  phone: z.string().refine(isMobilePhone),
});

export type ContactSchema = z.infer<typeof contactSchema>;
type Props = ComponentProps<"form"> & CommonFormProps<ContactSchema>;

import { useForm } from "@tanstack/react-form";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { handleConfetti } from "@/components/ui/confetti";
import { InputGroup } from "@/components/ui/input-group";
import type { CommonFormProps } from "./common";

export function ContactForm({
  onSub,
  defaultValues,
  disabled,
  ...props
}: Props) {
  const t = useTranslations("form.contactMe");
  const tCommons = useTranslations("form.common");

  const form = useForm({
    defaultValues: {
      email: "",
      message: "",
      name: "",
      phone: "",
      ...defaultValues,
    },
    onSubmit: (data) => onSub?.(data.value),
    validators: {
      onChange: contactSchema,
      onSubmit: contactSchema,
    },
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      {...props}
    >
      <Field.Set disabled={disabled}>
        {/* <Field.Legend>{t("title")}</Field.Legend>
        <Field.Description>{t("description")}</Field.Description> */}
        <Field.Group>
          <form.Field
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field.Root data-invalid={isInvalid}>
                  <Field.Label htmlFor={field.name}>{t("name")}</Field.Label>
                  <Input
                    aria-invalid={isInvalid}
                    autoComplete="off"
                    id={field.name}
                    name={field.name}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder={t("namePlaceholder")}
                    value={field.state.value}
                  />
                  {isInvalid && (
                    <Field.Error errors={field.state.meta.errors} />
                  )}
                </Field.Root>
              );
            }}
            name="name"
          />
          <div className="grid grid-cols-2 gap-4">
            <form.Field
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field.Root data-invalid={isInvalid}>
                    <Field.Label htmlFor={field.name}>{t("phone")}</Field.Label>
                    <Input
                      aria-invalid={isInvalid}
                      autoComplete="off"
                      id={field.name}
                      name={field.name}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder={t("phonePlaceholder")}
                      value={field.state.value}
                    />
                    {isInvalid && (
                      <Field.Error errors={field.state.meta.errors} />
                    )}
                  </Field.Root>
                );
              }}
              name="phone"
            />
            <form.Field
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field.Root data-invalid={isInvalid}>
                    <Field.Label htmlFor={field.name}>{t("email")}</Field.Label>
                    <Input
                      aria-invalid={isInvalid}
                      autoComplete="off"
                      id={field.name}
                      name={field.name}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder={t("emailPlaceholder")}
                      value={field.state.value}
                    />
                    {isInvalid && (
                      <Field.Error errors={field.state.meta.errors} />
                    )}
                  </Field.Root>
                );
              }}
              name="email"
            />
          </div>
          <form.Field
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field.Root data-invalid={isInvalid}>
                  <Field.Label htmlFor={field.name}>{t("message")}</Field.Label>
                  <InputGroup.Root>
                    <InputGroup.Textarea
                      aria-invalid={isInvalid}
                      id={field.name}
                      name={field.name}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder={t("messagePlaceholder")}
                      rows={6}
                      value={field.state.value}
                    />
                    <InputGroup.Addon align="block-end">
                      <InputGroup.Text className="tabular-nums">
                        {tCommons("characterCount", {
                          count: field.state.value.length,
                          total: 1000,
                        })}
                      </InputGroup.Text>
                    </InputGroup.Addon>
                  </InputGroup.Root>
                  <Field.Description>
                    {t("messageDescription")}
                  </Field.Description>
                  {isInvalid && (
                    <Field.Error errors={field.state.meta.errors} />
                  )}
                </Field.Root>
              );
            }}
            name="message"
          />
          <form.Subscribe
            children={(state) => {
              const isDisabled = !state.canSubmit;
              return (
                <Field.Root className="justify-end" orientation="horizontal">
                  <Button onClick={() => form.reset()} variant="ghost">
                    {tCommons("reset")}
                  </Button>
                  <Button
                    disabled={isDisabled}
                    onClick={(e) => handleConfetti(e)}
                    type="submit"
                    variant="outline"
                  >
                    {tCommons("submit")}
                  </Button>
                </Field.Root>
              );
            }}
          />
        </Field.Group>
      </Field.Set>
    </form>
  );
}
