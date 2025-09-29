import { CircleNotchIcon } from "@phosphor-icons/react";
import { Slot } from "@radix-ui/react-slot";
import { useTranslations } from "next-intl";
import { type ComponentProps, useMemo } from "react";
import { cn } from "@/lib/utils";

function ListRoot({
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

  return <div className={cn("group", className)} data-fetching={isFetching} data-state={state} {...props} />;
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

function ListInfo({ className, updatedAt, ...props }: ComponentProps<"div"> & { updatedAt?: number }) {
  const tCommon = useTranslations("common");

  return (
    <div className={cn("inline-flex items-center gap-1 py-1 text-muted-foreground text-xs", className)} {...props}>
      <time dateTime={new Date(updatedAt ?? 0).toISOString()}>
        {updatedAt && tCommon("updatedAtTitle", { date: new Date(updatedAt).toLocaleString() })}
      </time>
      <CircleNotchIcon className="animate-spin group-data-[state=content]:hidden" />
    </div>
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

export const List = {
  Root: ListRoot,
  Loading: ListLoading,
  Info: ListInfo,
  Empty: ListEmpty,
  Content: ListContent,
};
