import { LinkIcon } from "@phosphor-icons/react";
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
    <div className={cn("flex flex-col text-center", className)} {...props}>
      <Link
        className="group -ml-5 flex scroll-mt-[12vh] items-center justify-center gap-1 font-jetbrains-mono font-medium text-primary"
        href={`#${id}`}
        id={id}
      >
        <LinkIcon className="size-4 opacity-0 group-hover:opacity-100" />
        <span>{description}</span>
      </Link>
      <h3 className="font-semibold text-3xl">{title}</h3>
    </div>
  );
}
