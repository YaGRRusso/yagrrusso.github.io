import type { Object3D } from "three";

export function disableFrustumCulling(root: Object3D): void {
  root.traverse((object) => {
    object.frustumCulled = false;
  });
}
