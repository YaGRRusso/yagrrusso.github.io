import { Slot } from "@radix-ui/react-slot";
import { type ComponentProps, useMemo } from "react";
import { cn } from "@/lib/utils";

function ListRoot({
  className,
  isLoading,
  isEmpty,
  ...props
}: ComponentProps<"div"> & {
  isLoading?: boolean;
  isEmpty?: boolean;
}) {
  const state = useMemo(() => {
    if (isLoading) return "loading";
    if (isEmpty) return "empty";
    return "content";
  }, [isLoading, isEmpty]);

  return <div className={cn("group", className)} data-state={state} {...props} />;
}

function ListLoading(props: ComponentProps<typeof Slot>) {
  return (
    <Slot
      aria-hidden="true"
      className="group-data-[state=content]:hidden group-data-[state=empty]:hidden"
      data-slot="list-loading"
      {...props}
    />
  );
}

function ListEmpty(props: ComponentProps<typeof Slot>) {
  return (
    <Slot
      aria-hidden="true"
      className="group-data-[state=content]:hidden group-data-[state=loading]:hidden"
      data-slot="list-empty"
      {...props}
    />
  );
}

function ListContent(props: ComponentProps<typeof Slot>) {
  return (
    <Slot
      className="group-data-[state=empty]:hidden group-data-[state=loading]:hidden"
      data-slot="list-content"
      {...props}
    />
  );
}

export const List = { Root: ListRoot, Loading: ListLoading, Empty: ListEmpty, Content: ListContent };
