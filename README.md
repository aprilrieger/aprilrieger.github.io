# aprilrieger.github.io

Senior-level portfolio site built with [Astro 6.2](https://astro.build/), MDX content collections, and Tailwind CSS. Static output goes to `dist/` for GitHub Pages.

Requires **Node 20+**. This repo uses [`.npmrc`](.npmrc) with `legacy-peer-deps=true` so `@astrojs/tailwind` installs cleanly with Astro 6 until upstream peer ranges catch up.

## Develop

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
npm run preview
```

## Theme

Colors are semantic tokens in [`tailwind.config.mjs`](tailwind.config.mjs) (`canvas`, `surface`, `border`, `ink`, `accent`). Edit the hex values there to re-skin the site.

## Content

- Content collections: [`src/content.config.ts`](src/content.config.ts) (glob loaders; Astro 6 format)
- Case studies: [`src/content/caseStudies/*.mdx`](src/content/caseStudies)
- Blog: [`src/content/blog/*.mdx`](src/content/blog)
- Site metadata and nav: [`src/site.config.ts`](src/site.config.ts)
- Static assets (images, resume PDF): [`public/`](public)

Replace [`public/april_rieger_resume.pdf`](public/april_rieger_resume.pdf) with your final resume.

## Deploy

GitHub Actions workflow [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) runs `npm ci` and `npm run build`, then deploys `dist/` to GitHub Pages.
