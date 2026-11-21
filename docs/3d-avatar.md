# 3D avatar

Commands to optimize the hero avatar's model, poster and lighting.

## Requirements

- ImageMagick and OpenImageIO:

```bash
sudo apt install imagemagick openimageio-tools
```

## Swap the model

1. Compress the model:

```bash
npx @gltf-transform/cli optimize source.glb public/model.glb --compress meshopt --texture-compress webp
```

2. Open it in the [three.js editor](https://threejs.org/editor/) and copy the head
bone and idle clip names into `AVATAR_MODEL`.

3. In the debug panel, paste `log camera` into `AVATAR_CAMERA` and `log look` into
`DEFAULT_HEAD_LOOK`.

4. Click `save snapshot` and convert it to the poster:

```bash
magick snapshot.png -quality 85 public/images/model-poster.webp
```

## Change the lighting

```bash
oiiotool sky.hdr --resize 256x128 -o public/hdri/city.hdr
```
