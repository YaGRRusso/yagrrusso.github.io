import { AnimationClip } from "three";

const MIXAMO_BONE_PREFIX = /^mixamorig\d*[:_]?/;

function toModelTrackName(trackName: string): string {
  return trackName.replace(MIXAMO_BONE_PREFIX, "");
}

export function toInPlaceMixamoClip(
  clip: AnimationClip,
  name: string
): AnimationClip {
  const tracks = clip.tracks
    .filter((track) => !track.name.endsWith(".position"))
    .map((track) => {
      const modelTrack = track.clone();
      modelTrack.name = toModelTrackName(track.name);
      return modelTrack;
    });

  return new AnimationClip(name, clip.duration, tracks);
}
