import { CaretRightIcon } from "@phosphor-icons/react";
import type { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";
import { Button } from "./ui/button";

interface Props extends ComponentProps<typeof Link> {
  title: string;
}

export function TitleLink({ children, className, title, ...props }: Props) {
  return (
    <Button asChild size="sm" variant="outline">
      <Link {...props}>
        <CaretRightIcon className="-mx-1" weight="bold" />
        {title}
      </Link>
    </Button>
  );
}
