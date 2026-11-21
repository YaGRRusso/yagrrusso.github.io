"use client";

import { useGLTF } from "@react-three/drei";
import { type ReactNode, Suspense, useEffect } from "react";
import type { AnimationClip } from "three";
import { assertSingleClip } from "@/lib/assert-single-clip";
import { toInPlaceMixamoClip } from "@/lib/mixamo";

type ClipLoadHandler = (name: string, clip: AnimationClip) => void;

interface MixamoClipLoaderProps {
  name: string;
  onLoad: ClipLoadHandler;
  path: string;
}

function MixamoClipLoader({
  name,
  onLoad,
  path,
}: MixamoClipLoaderProps): ReactNode {
  const gltf = useGLTF(path);

  useEffect(() => {
    const clip = assertSingleClip(gltf.animations, path);
    onLoad(name, toInPlaceMixamoClip(clip, name));
  }, [gltf.animations, name, onLoad, path]);

  return null;
}

interface MixamoClipsLoaderProps {
  clips: { name: string; path: string }[];
  onLoad: ClipLoadHandler;
}

export function MixamoClipsLoader({
  clips,
  onLoad,
}: MixamoClipsLoaderProps): ReactNode {
  return (
    <Suspense fallback={null}>
      {clips.map((clip) => (
        <MixamoClipLoader
          key={clip.name}
          name={clip.name}
          onLoad={onLoad}
          path={clip.path}
        />
      ))}
    </Suspense>
  );
}
