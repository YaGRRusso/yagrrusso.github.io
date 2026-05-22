import { CaretRightIcon } from "@phosphor-icons/react";
import type { ComponentProps, ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { Button } from "./ui/button";

interface Props
  extends ComponentProps<typeof Link>,
    Pick<ComponentProps<typeof Button>, "size" | "variant"> {
  icon?: ReactNode;
  title: string;
}

export function TitleLink({
  children,
  className,
  title,
  icon = <CaretRightIcon className="-mx-1" weight="bold" />,
  size = "sm",
  variant = "outline",
  ...props
}: Props) {
  return (
    <Button asChild size={size} variant={variant}>
      <Link {...props}>
        {icon}
        {title}
      </Link>
    </Button>
  );
}
