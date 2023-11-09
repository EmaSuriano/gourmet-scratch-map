# Gourmet Scratch Map

> Open Source Map based on [Gourmet Scratch Map](https://drop.com/buy/luckies-of-london-gourmet-scratch-map) from [Luckies of London](https://luckies.co.uk/)

## Motivation

The [original website](https://www.gourmetscratchmap.com/) is now out of order, there is no way that now the holders of this map can actually access the content that used to be there.

Therefore I decided to create my own version of it while testing new tools on the way.

## Tech stack

- [Astro](https://astro.build/): for web framework

## How was this project created?

I found a relative good picture of the map while searching the web:

![Preview of the map](http://cdn.notonthehighstreet.com/system/product_images/images/001/330/651/original_gourmet-scratch-map.jpg)

The main issue with the image is that the resolution is quite low: 900x900 (199 KB) ... Which is going to look quite bad when being used in a large screen, or even when zooming.

That's where AI comes into play! I used the [upscale](https://www.upscale.media/) service by [PixelBin.io](https://www.pixelbin.io/), where I managed to increase the image resolution by 4 times! Having as a result an image with dimensions of 3441 × 3445 (6,8 MB) 🚀

![Scaled map](https://github.com/EmaSuriano/gourmet-scratch-map/assets/3399429/92fa048c-9762-47fd-8ba1-aea41079e82a)

But obviously serving an image of almost 7 MB is not the best in terms of performance for the web, and also in case the user would like to interact with each of the segment of the map I had to manually select the parts of the image, which is going to be quite a challenging and painful process.

One of the most performance type of assets in the web is indeed `SVG`, it allows to have almost infinite scrolling and reduce the assets size drastically. I searched online for a tool that can convert my `JPEG` file to `SVG`, and I found out that [convert.io](https://convertio.co) worked the best in my case. The only caveat about the process is that my image ended up loosing the colors, but this is not a problem for my use case.

The result is a sharp SVG that can be expanded until what the browser needs and it will never show definition on the process (because of the usage of vectors). On top of that now the asset only takes 600 KB, which is a reduction of around 91% 🤯

![SVG convertion](https://github.com/EmaSuriano/gourmet-scratch-map/assets/3399429/63417682-3bb8-4f5f-991d-ba00a146bcf8)

Once I have the map in `SVG`, I need a way to define which part of the map matches with each dish. Obviously the image doesn't contain this information, and each dish has a different shape and size than others. The only way for this step is to do it manually. So let's jump into the `SVG` world of Figma and start adding those layers.

## Setup

```
npm create astro@latest -- --template basics
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/basics)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/basics)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/basics/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![basics](https://user-images.githubusercontent.com/4677417/186188965-73453154-fdec-4d6b-9c34-cb35c248ae5b.png)

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Card.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:3000`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
