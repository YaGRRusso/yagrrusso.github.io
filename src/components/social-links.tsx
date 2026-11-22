import type { ComponentProps, ReactNode } from "react";
import { Button } from "./ui/button";

interface Props extends ComponentProps<"a"> {
  icon: ReactNode;
}

export function SocialLink({
  icon,
  rel = "noopener",
  target = "_blank",
  ...props
}: Props) {
  return (
    <Button asChild size="icon-lg" variant="outline">
      <a rel={rel} target={target} {...props}>
        {icon}
      </a>
    </Button>
  );
}
