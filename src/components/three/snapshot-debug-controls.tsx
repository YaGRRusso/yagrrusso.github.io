"use client";

import { type RootState, useThree } from "@react-three/fiber";
import { button, useControls } from "leva";
import type { ReactNode } from "react";
import { DEBUG_LAYER } from "@/components/three/debug-layer";
import { getOrThrow } from "@/lib/get-or-throw";

const SNAPSHOT_FILE_NAME = "snapshot.png";

function downloadBlob(blob: Blob | null): void {
  const url = URL.createObjectURL(getOrThrow(blob, "canvas snapshot image"));
  const link = document.createElement("a");
  link.href = url;
  link.download = SNAPSHOT_FILE_NAME;
  link.click();
  URL.revokeObjectURL(url);
}

function saveSnapshot({ camera, gl, scene }: RootState): void {
  camera.layers.disable(DEBUG_LAYER);
  gl.render(scene, camera);
  gl.domElement.toBlob(downloadBlob, "image/png");
  camera.layers.enable(DEBUG_LAYER);
}

export function SnapshotDebugControls(): ReactNode {
  const getThree = useThree((state) => state.get);

  useControls({
    "save snapshot": button(() => saveSnapshot(getThree())),
  });

  return null;
}
