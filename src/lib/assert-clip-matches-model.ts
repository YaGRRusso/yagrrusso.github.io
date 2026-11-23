import { uniq } from "lodash";
import { type AnimationClip, type Object3D, PropertyBinding } from "three";

export function assertClipMatchesModel(
  clip: AnimationClip,
  model: Object3D,
  source: string
): AnimationClip {
  const missingNodes = uniq(
    clip.tracks
      .map((track) => PropertyBinding.parseTrackName(track.name).nodeName)
      .filter((nodeName) => !model.getObjectByName(nodeName))
  );
  if (missingNodes.length > 0) {
    throw new Error(
      `Animation clip in ${source} targets ${missingNodes.length} nodes missing from the model: ${missingNodes.join(", ")}`
    );
  }
  return clip;
}
