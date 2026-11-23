# 3D avatar

Commands and steps to produce the 3D avatar's assets: models, animations,
lighting, scenes and snapshots. Primitives live in `src/components/avatar/avatar-config.ts`
(`MODEL_ASSETS`, `ANIMATION_ASSETS`, `HDRI_ASSETS`), keyed by an id that matches their
file name. A scene in `SCENES` composes one model, one HDRI, its animations and a
camera, and a snapshot is the poster of one scene.

The config mirrors `public/`: compressed files in `public/models/`, `public/animations/`,
`public/hdri/` and `public/snapshots/`, uncompressed originals in the same layout under
`public/_dev/originals/` (committed, development only: `public/.assetsignore` skips
`_dev/` on deploy). To compare an original with its compressed version, point that
entry's `path` to `/_dev/originals/...`.

## Requirements

- ImageMagick and OpenImageIO (`sudo apt install imagemagick openimageio-tools`)
- `NEXT_PUBLIC_DEBUG=true` in `.env.development` for the debug panel

## Model

1. Export the avatar from [Avaturn](https://avaturn.me) as GLB.

2. Remove off-screen meshes (`avaturn_shoes_0`) in the [three.js editor](https://threejs.org/editor/), export with File → Export → GLB and save it as `public/_dev/originals/models/avaturn.glb`.

3. Compress it (add `--simplify false` if the face or hair lose detail):

```bash
npx @gltf-transform/cli optimize public/_dev/originals/models/avaturn.glb public/models/avaturn.glb --compress meshopt --texture-compress webp
```

4. Add it to `MODEL_ASSETS` with its head and torso bone names (Outliner in the three.js editor):

```ts
avaturn: {
  boneNames: { head: "Head", torso: "Spine2" },
  path: "/models/avaturn.glb",
},
```

Animations embedded in a model file are ignored: the scene picks its idle. Models
from other sources need standard bone names: re-rig them with
[Mixamo's auto-rigger](https://www.mixamo.com).

5. Use it in a scene, frame the camera and take the snapshot (sections below).

## Animations

Mixamo can't read the Avaturn GLB, so use the test avatar from
[Avaturn's Mixamo guide](https://docs.avaturn.me/docs/importing/mixamo/): same
skeleton, bone names prefixed with `mixamorig`.

1. Download a clip from [Mixamo](https://www.mixamo.com) on that avatar (`FBX Binary`, `Without Skin`, `30` fps, no keyframe reduction).

2. Convert the FBX in the [three.js editor](https://threejs.org/editor/) with File → Export → GLB and save it as `public/_dev/originals/animations/neck-stretching.glb`.

3. Compress it:

```bash
npx @gltf-transform/cli optimize public/_dev/originals/animations/neck-stretching.glb public/animations/neck-stretching.glb --compress meshopt
```

4. Add it to `ANIMATION_ASSETS`, then use it as a scene's `idle` or in its `animations`:

```ts
"neck-stretching": { path: "/animations/neck-stretching.glb" },
```

5. Play it from anywhere (once by default, then back to the idle):

```ts
playClip("neck-stretching", { repetitions: 2 });
```

`playClipWhenIdle` does the same, but only when the idle is playing (no clip is cut off).

`PortfolioAvatar` plays one random clip from `IDLE_BREAK_ANIMATIONS` every 30–60s
while it is on screen (not with `prefers-reduced-motion`); add the id there to include it:

```ts
const IDLE_BREAK_ANIMATIONS = ["arm-stretching", "neck-stretching"] as const;
```

A scene's idle loads together with the model; its other clips load in the background
after the model shows. All clips play in place (the `mixamorig` prefix and the hips
position track are removed on load).

## Lighting

1. Download a 1k equirectangular HDR from [Poly Haven](https://polyhaven.com/hdris) and save it as `public/_dev/originals/hdri/city.hdr`.

2. Shrink it to 256 wide (not with `magick`: it clamps HDR values and flattens the lighting):

```bash
oiiotool public/_dev/originals/hdri/city.hdr --resize 256x128 -o public/hdri/city.hdr
```

3. Add it to `HDRI_ASSETS`:

```ts
city: { path: "/hdri/city.hdr" },
```

## Scenes

1. Compose the scene in `SCENES`:

```ts
hero: {
  animations: ["arm-stretching", "neck-stretching", "waving"],
  camera: { fov: 30, position: [0, 0.6, 1.4], target: [0, 0.6, 0] },
  hdri: "city",
  idle: "idle",
  look: {
    head: { dampSpeed: 4, pitchLimit: 0.45, targetDepth: 0.5, weight: 1, yawLimit: 0.6 },
    torso: { dampSpeed: 2, pitchLimit: 0.5, targetDepth: 0.5, weight: 0.35, yawLimit: 0.35 },
  },
  model: "avaturn",
  restGaze: { x: 0, y: 0 },
},
```

`restGaze` is where the head looks before the first mouse move or touch (on touch,
it keeps looking at the last touch point), in canvas coordinates: `{ x: 0, y: 0 }` is the center, `x` grows
right, `y` grows up, `±1` are the edges.

2. Render it with its poster:

```tsx
<PortfolioAvatar onReady={handleAvatarReady} sceneId="hero" />
<AvatarPoster sceneId="hero" />
```

## Camera and look

1. Frame the avatar in the debug view (left drag orbits, right drag pans, scroll zooms, the blue dot is the pivot).

2. Click `log camera` and paste the output into the scene's `camera` in `SCENES`.

3. Tune the `head` and `torso` sliders (the red dot is where the head looks).

4. Click `log look` and paste the output into the scene's `look` in `SCENES` (`weight: 0` on head and torso turns the follow off).

## Snapshots

Snapshots are named after their scene. Retake one after changing anything in its scene.

1. Reload the debug view, click `reset camera`, then `save snapshot` and save it as `public/_dev/originals/snapshots/hero.png`.

2. Convert it (take the snapshot on a 2x screen for a sharper poster):

```bash
magick public/_dev/originals/snapshots/hero.png -quality 85 public/snapshots/hero.webp
```
