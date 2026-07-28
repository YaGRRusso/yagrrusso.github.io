import { DotIcon } from "@phosphor-icons/react";
import { Children, type ComponentProps, Fragment, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props extends ComponentProps<"div"> {
  children: ReactNode;
}

export function DottedList({ children, className, ...props }: Props) {
  const items = Children.toArray(children);

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-2 gap-y-1 text-muted-foreground text-sm",
        className
      )}
      {...props}
    >
      {items.map((item, index) => (
        <Fragment key={index}>
          {index > 0 && <DotIcon />}
          {item}
        </Fragment>
      ))}
    </div>
  );
}
