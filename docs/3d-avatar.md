# 3D avatar

How to produce and optimize every asset of the hero avatar: model, animations,
lighting, camera framing and loading poster. Config lives in
`src/components/avatar/avatar-config.ts`. The uncompressed originals live in
`assets/avatar/` (committed, never deployed) and are compressed into `public/`.

## Requirements

- ImageMagick and OpenImageIO (`sudo apt install imagemagick openimageio-tools`)
- `NEXT_PUBLIC_DEBUG=true` in `.env.development` for the debug panel

## Model

1. Export the avatar from [Avaturn](https://avaturn.me) as GLB.

2. Remove off-screen meshes (`avaturn_shoes_0`) in the [three.js editor](https://threejs.org/editor/), export with File → Export → GLB and save it as `assets/avatar/model.glb`.

3. Compress it (add `--simplify false` if the face or hair lose detail):

```bash
npx @gltf-transform/cli optimize assets/avatar/model.glb public/model.glb --compress meshopt --texture-compress webp
```

4. Set the bone names (Outliner) and idle clip name (Animation) from the three.js editor in `AVATAR_MODEL`.

5. Reframe the camera, retune the look and retake the poster (sections below).

## Animations

Mixamo can't read the Avaturn GLB, so use the test avatar from
[Avaturn's Mixamo guide](https://docs.avaturn.me/docs/importing/mixamo/): same
skeleton, bone names prefixed with `mixamorig`.

1. Download a clip from [Mixamo](https://www.mixamo.com) on that avatar (`FBX Binary`, `Without Skin`, `30` fps, no keyframe reduction).

2. Convert the FBX in the [three.js editor](https://threejs.org/editor/) with File → Export → GLB and save it as `assets/avatar/animations/dance.glb`.

3. Compress it:

```bash
npx @gltf-transform/cli optimize assets/avatar/animations/dance.glb public/animations/dance.glb --compress meshopt
```

4. Register it in `AVATAR_MODEL.mixamoClipPaths`:

```ts
mixamoClipPaths: { wave: "/animations/wave.glb", dance: "/animations/dance.glb" },
```

5. Play it from anywhere:

```ts
playClip("dance", { repetitions: 2 });
```

Clips load in the background after the model shows, and play in place (the
`mixamorig` prefix and the hips position track are removed on load).

## Lighting

1. Download a 1k equirectangular HDR from [Poly Haven](https://polyhaven.com/hdris) and save it as `assets/avatar/hdri/city-1k.hdr`.

2. Shrink it to 256 wide (not with `magick`: it clamps HDR values and flattens the lighting):

```bash
oiiotool assets/avatar/hdri/city-1k.hdr --resize 256x128 -o public/hdri/city.hdr
```

## Camera and look

1. Frame the avatar in the debug view (left drag orbits, right drag pans, scroll zooms, the blue dot is the pivot).

2. Click `log camera` and paste the output into `AVATAR_CAMERA`.

3. Tune the `head` and `torso` sliders (the red dot is where the head looks).

4. Click `log look` and paste the output into `DEFAULT_LOOK`.

## Poster

Retake it after changing the model, lighting or camera.

1. Reload the debug view, click `reset camera`, then `save snapshot` and save it as `assets/avatar/snapshot.png`.

2. Convert it (take the snapshot on a 2x screen for a sharper poster):

```bash
magick assets/avatar/snapshot.png -quality 85 public/images/model-poster.webp
```
