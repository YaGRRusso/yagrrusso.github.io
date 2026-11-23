import type { Bone, SkinnedMesh } from "three";

const SKIN_INFLUENCES = 4;

export function getDominantBone(mesh: SkinnedMesh, vertex: number): Bone {
  const skinIndex = mesh.geometry.getAttribute("skinIndex");
  const skinWeight = mesh.geometry.getAttribute("skinWeight");
  let dominantIndex = skinIndex.getComponent(vertex, 0);
  let dominantWeight = skinWeight.getComponent(vertex, 0);

  for (let influence = 1; influence < SKIN_INFLUENCES; influence += 1) {
    const weight = skinWeight.getComponent(vertex, influence);
    if (weight <= dominantWeight) continue;
    dominantWeight = weight;
    dominantIndex = skinIndex.getComponent(vertex, influence);
  }

  return mesh.skeleton.bones[dominantIndex];
}
