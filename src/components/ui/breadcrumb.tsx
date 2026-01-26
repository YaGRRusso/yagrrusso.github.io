import { CaretRightIcon, DotsThreeIcon } from "@phosphor-icons/react";
import { Slot } from "@radix-ui/react-slot";
import type { ComponentProps, ComponentPropsWithoutRef } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

function BreadcrumbRoot({ ...props }: ComponentProps<"nav">) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />;
}

function BreadcrumbList({ className, ...props }: ComponentProps<"ol">) {
  return (
    <ol
      className={cn(
        "wrap-reak-words flex flex-wrap items-center gap-1.5 font-jetbrains-mono font-medium text-muted-foreground tracking-wide sm:gap-2.5",
        className
      )}
      data-slot="breadcrumb-list"
      {...props}
    />
  );
}

function BreadcrumbItem({ className, ...props }: ComponentProps<"li">) {
  return (
    <li
      className={cn("inline-flex items-center gap-1.5 uppercase", className)}
      data-slot="breadcrumb-item"
      {...props}
    />
  );
}

function BreadcrumbLink({
  asChild,
  className,
  ...props
}: ComponentPropsWithoutRef<typeof Link> & {
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot : Link;

  return (
    <Comp
      className={cn(
        "inline-flex items-center gap-x-1.5 transition-colors hover:text-primary",
        className
      )}
      data-slot="breadcrumb-link"
      {...props}
    />
  );
}

function BreadcrumbPage({ ...props }: ComponentProps<"span">) {
  return (
    <span
      aria-current="page"
      aria-disabled="true"
      className="text-primary"
      data-slot="breadcrumb-page"
      {...props}
    />
  );
}

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: ComponentProps<"li">) {
  return (
    <li
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      data-slot="breadcrumb-separator"
      role="presentation"
      {...props}
    >
      {children ?? <CaretRightIcon className="mb-0.5" weight="bold" />}
    </li>
  );
}

function BreadcrumbEllipsis({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      aria-hidden="true"
      className={cn("flex size-9 items-center justify-center", className)}
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      {...props}
    >
      <DotsThreeIcon className="size-6" />
      <span className="sr-only">More</span>
    </span>
  );
}

export const Breadcrumb = {
  Root: BreadcrumbRoot,
  List: BreadcrumbList,
  Item: BreadcrumbItem,
  Link: BreadcrumbLink,
  Page: BreadcrumbPage,
  Separator: BreadcrumbSeparator,
  Ellipsis: BreadcrumbEllipsis,
};
