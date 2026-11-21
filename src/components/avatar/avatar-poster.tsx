import Image from "next/image";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { getSnapshotPath, type SceneId } from "./avatar-config";

interface AvatarPosterProps
  extends Omit<ComponentProps<typeof Image>, "alt" | "fill" | "src"> {
  sceneId: SceneId;
}

export function AvatarPoster({
  className,
  sceneId,
  ...props
}: AvatarPosterProps): ReactNode {
  return (
    <Image
      alt=""
      className={cn("pointer-events-none object-contain", className)}
      fetchPriority="high"
      fill
      priority
      src={getSnapshotPath(sceneId)}
      {...props}
    />
  );
}
