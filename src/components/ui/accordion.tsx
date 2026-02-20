"use client";

import { CaretDownIcon } from "@phosphor-icons/react";
import { Accordion as AccordionPrimitive } from "radix-ui";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

function AccordionRoot({
  ...props
}: ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({
  ...props
}: ComponentProps<typeof AccordionPrimitive.Item>) {
  return <AccordionPrimitive.Item data-slot="accordion-item" {...props} />;
}

function AccordionTrigger({
  className,
  children,
  indicator,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Trigger> & {
  indicator?: boolean;
}) {
  return (
    <AccordionPrimitive.Trigger
      className={cn("group group/hover cursor-pointer", className)}
      data-slot="accordion-trigger"
      {...props}
    >
      {children}
      {indicator && (
        <Button asChild size="icon" variant="ghost">
          <div>
            <CaretDownIcon className="transition-transform group-data-[state=open]:rotate-180" />
          </div>
        </Button>
      )}
    </AccordionPrimitive.Trigger>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      data-slot="accordion-content"
      {...props}
    >
      <div className={className}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export const Accordion = {
  Root: AccordionRoot,
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
};
