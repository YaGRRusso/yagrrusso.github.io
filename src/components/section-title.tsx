import { CaretDoubleRightIcon, CaretRightIcon } from "@phosphor-icons/react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

interface Props extends ComponentProps<"div"> {
  description: string;
  id: string;
  title: string;
}

export function SectionTitle({
  id,
  className,
  title,
  description,
  ...props
}: Props) {
  return (
    <div
      className={cn(
        "flex max-w-lg scroll-mt-[calc(var(--layout-header-height)+2rem)] flex-col gap-2 tracking-wide",
        className
      )}
      id={id}
      {...props}
    >
      <a
        className="group -ml-5 flex items-center gap-1 font-medium font-mono text-primary uppercase"
        href={`#${id}`}
      >
        <CaretRightIcon
          className="mb-0.5 animate-caret-blink group-hover:hidden"
          weight="bold"
        />
        <CaretDoubleRightIcon
          className="mb-0.5 hidden group-hover:inline"
          weight="bold"
        />
        <span>{title}</span>
      </a>
      <h3 className="font-bold text-4xl">{description}</h3>
    </div>
  );
}
