import Image from "next/image";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

const MODEL_POSTER_SRC = "/images/model-poster.webp";

type AvatarPosterProps = Omit<
  ComponentProps<typeof Image>,
  "alt" | "fill" | "src"
>;

export function AvatarPoster({
  className,
  ...props
}: AvatarPosterProps): ReactNode {
  return (
    <Image
      alt=""
      className={cn("pointer-events-none object-contain", className)}
      fill
      priority
      src={MODEL_POSTER_SRC}
      {...props}
    />
  );
}
