import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import type { AnimationClip } from "three";
import { getOrThrow } from "@/lib/get-or-throw";
import { toInPlaceMixamoClip } from "@/lib/mixamo";

export function useMixamoClips(
  clipPaths: Record<string, string>
): AnimationClip[] {
  const gltfs = useGLTF(Object.values(clipPaths));

  return useMemo(
    () =>
      Object.entries(clipPaths).map(([name, path], index) =>
        toInPlaceMixamoClip(
          getOrThrow(gltfs[index].animations[0], `animation clip in ${path}`),
          name
        )
      ),
    [clipPaths, gltfs]
  );
}
