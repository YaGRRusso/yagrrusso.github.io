import { CaretRightIcon } from "@phosphor-icons/react";
import type { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

interface Props extends ComponentProps<"div"> {
  id: string;
  title: string;
  description: string;
}

export function SectionTitle({
  id,
  children,
  className,
  title,
  description,
  ...props
}: Props) {
  return (
    <div
      className={cn("flex max-w-lg flex-col gap-2 tracking-wide", className)}
      {...props}
    >
      <Link
        className="group -ml-5 flex scroll-mt-[12vh] items-center gap-1 font-jetbrains-mono font-medium text-primary uppercase"
        href={`#${id}`}
        id={id}
      >
        <CaretRightIcon
          className="mb-0.5 animate-caret-blink group-hover:animate-none"
          weight="bold"
        />
        <span>{title}</span>
      </Link>
      <h3 className="font-bold text-4xl">{description}</h3>
    </div>
  );
}
