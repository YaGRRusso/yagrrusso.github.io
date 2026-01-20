/** biome-ignore-all lint/correctness/noChildrenProp: tanstack router core */
import type { ComponentProps } from "react";
import validator from "validator";
import { z } from "zod";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  phone: z.string().refine(validator.isMobilePhone),
  email: z.email(),
  message: z.string().min(8).max(1000),
});

interface Props extends ComponentProps<"form"> {}

import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { InputGroup } from "@/components/ui/input-group";

export function ContactForm({ ...props }: Props) {
  const form = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
    },
    validators: {
      onSubmit: contactSchema,
      onChange: contactSchema,
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
      <Field.Set>
        <Field.Legend>Contact Us</Field.Legend>
        <Field.Description>
          Please fill out the form below and we will get back to you as soon as
          possible.
        </Field.Description>
        <Field.Group>
          <form.Field
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field.Root data-invalid={isInvalid}>
                  <Field.Label htmlFor={field.name}>Your Name</Field.Label>
                  <Input
                    aria-invalid={isInvalid}
                    autoComplete="off"
                    id={field.name}
                    name={field.name}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Your full name"
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
                    <Field.Label htmlFor={field.name}>Phone Number</Field.Label>
                    <Input
                      aria-invalid={isInvalid}
                      autoComplete="off"
                      id={field.name}
                      name={field.name}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="+1 234 567 8901"
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
                    <Field.Label htmlFor={field.name}>
                      Email Address
                    </Field.Label>
                    <Input
                      aria-invalid={isInvalid}
                      autoComplete="off"
                      id={field.name}
                      name={field.name}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="your.email@example.com"
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
                  <Field.Label htmlFor={field.name}>Message</Field.Label>
                  <InputGroup.Root>
                    <InputGroup.Textarea
                      aria-invalid={isInvalid}
                      id={field.name}
                      name={field.name}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Your message here..."
                      rows={6}
                      value={field.state.value}
                    />
                    <InputGroup.Addon align="block-end">
                      <InputGroup.Text className="tabular-nums">
                        {field.state.value.length}/1000 characters
                      </InputGroup.Text>
                    </InputGroup.Addon>
                  </InputGroup.Root>
                  <Field.Description>
                    Include any details or questions you have.
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
                    Reset
                  </Button>
                  <Button disabled={isDisabled} type="submit" variant="outline">
                    Submit
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
