import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-md border px-2 py-0.5 font-light text-[0.625rem] uppercase tracking-wider transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    defaultVariants: {
      variant: "default",
    },
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground/80 [a&]:hover:bg-primary/90",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground/80 focus-visible:ring-destructive/20 [a&]:hover:bg-destructive/90",
        muted:
          "border-transparent bg-muted text-muted-foreground [a&]:hover:bg-muted/90",
        outline:
          "text-foreground/80 [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground/80 [a&]:hover:bg-secondary/90",
      },
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      className={cn(badgeVariants({ variant }), className)}
      data-slot="badge"
      {...props}
    />
  );
}

export { Badge, badgeVariants };
