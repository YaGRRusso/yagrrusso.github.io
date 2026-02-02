import { Slot } from "@radix-ui/react-slot";
import { type ComponentProps, useMemo } from "react";
import { cn } from "@/lib/utils";

function RequestRoot({
  className,
  isLoading,
  isFetching,
  isEmpty,
  ...props
}: ComponentProps<"div"> & {
  isLoading?: boolean;
  isFetching?: boolean;
  isEmpty?: boolean;
}) {
  const state = useMemo(() => {
    if (isLoading) return "loading";
    if (isEmpty) return "empty";
    return "content";
  }, [isLoading, isEmpty]);

  return (
    <div
      className={cn("group", className)}
      data-fetching={isFetching}
      data-state={state}
      {...props}
    />
  );
}

function RequestLoading(props: ComponentProps<typeof Slot>) {
  return (
    <Slot
      aria-hidden="true"
      className="group-data-[state=content]:hidden group-data-[state=empty]:hidden"
      data-slot="request-loading"
      {...props}
    />
  );
}

function RequestEmpty(props: ComponentProps<typeof Slot>) {
  return (
    <Slot
      aria-hidden="true"
      className="group-data-[state=content]:hidden group-data-[state=loading]:hidden"
      data-slot="request-empty"
      {...props}
    />
  );
}

function RequestContent(props: ComponentProps<typeof Slot>) {
  return (
    <Slot
      className="group-data-[state=empty]:hidden group-data-[state=loading]:hidden"
      data-slot="request-content"
      {...props}
    />
  );
}

export const Request = {
  Root: RequestRoot,
  Loading: RequestLoading,
  Empty: RequestEmpty,
  Content: RequestContent,
};
