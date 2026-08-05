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
  href,
  ...props
}: Props) {
  const content = (
    <>
      {icon}
      {title}
      {children}
    </>
  );

  if (typeof href === "string" && href.includes("#")) {
    return (
      <Button asChild size={size} variant={variant}>
        <a className={className} href={href}>
          {content}
        </a>
      </Button>
    );
  }

  return (
    <Button asChild size={size} variant={variant}>
      <Link className={className} href={href} {...props}>
        {content}
      </Link>
    </Button>
  );
}
