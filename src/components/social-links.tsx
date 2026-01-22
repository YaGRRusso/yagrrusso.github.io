import type { ComponentProps, ReactNode } from "react";
import { Button } from "./ui/button";

interface Props extends ComponentProps<"a"> {
  icon: ReactNode;
}

export function SocialLink({
  icon,
  title,
  rel = "noopener",
  target = "_blank",
  ...props
}: Props) {
  return (
    <Button asChild size="auto" variant="outline">
      <a rel={rel} target={target} {...props}>
        {icon}
      </a>
    </Button>
  );
}
