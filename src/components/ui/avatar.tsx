"use client";

import { ImageBrokenIcon } from "@phosphor-icons/react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

function AvatarRoot({
  className,
  ...props
}: ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded",
        className
      )}
      data-slot="avatar"
      {...props}
    />
  );
}

function AvatarImage({
  className,
  ...props
}: ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      className={cn("aspect-square size-full", className)}
      data-slot="avatar-image"
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  children,
  ...props
}: ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      className={cn(
        "flex size-full items-center justify-center bg-muted",
        className
      )}
      data-slot="avatar-fallback"
      {...props}
    >
      {children ?? <ImageBrokenIcon />}
    </AvatarPrimitive.Fallback>
  );
}

export const Avatar = {
  Fallback: AvatarFallback,
  Image: AvatarImage,
  Root: AvatarRoot,
};
