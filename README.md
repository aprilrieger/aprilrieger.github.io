# aprilrieger.github.io

[![codecov](https://codecov.io/gh/aprilrieger/aprilrieger.github.io/graph/badge.svg)](https://codecov.io/gh/aprilrieger/aprilrieger.github.io)

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

## Test

```sh
npm test              # run tests
npm run test:watch    # run tests in watch mode
npm run test:coverage # run tests with coverage report
```

Coverage reports are uploaded to [Codecov](https://codecov.io/gh/aprilrieger/aprilrieger.github.io) on CI. Thresholds (80% lines/branches/functions/statements) are enforced in [`vitest.config.ts`](vitest.config.ts).

## Theme

Colors are semantic tokens in [`tailwind.config.mjs`](tailwind.config.mjs) (`canvas`, `surface`, `border`, `ink`, `accent`). Edit the hex values there to re-skin the site.

## Content

- Content collections: [`src/content.config.ts`](src/content.config.ts) (glob loaders; Astro 6 format)
- Case studies: [`src/content/caseStudies/*.mdx`](src/content/caseStudies)
- Blog: [`src/content/blog/*.mdx`](src/content/blog)
- Site metadata and nav: [`src/site.config.ts`](src/site.config.ts)
- Static assets (images, resume PDF): [`public/`](public)

Replace [`public/April_Rieger_Software_Engineer_Resume_2026.pdf`](public/April_Rieger_Software_Engineer_Resume_2026.pdf) with your final resume.

## Deploy (GitHub Pages)

This repo is set up for a **user site** at `https://aprilrieger.github.io`. `site` in [`astro.config.mjs`](astro.config.mjs) must stay `https://aprilrieger.github.io` (no `base` path).

### One-time GitHub settings

1. Repo **Settings** → **Pages** → **Build and deployment**.
2. Under **Source**, choose **GitHub Actions** (not “Deploy from a branch”).
3. Push **`main`** or **`using-astro`**; the workflow [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) will build and publish `dist/`. (While the Astro branch is in flight, **`using-astro` and `main` both deploy** to the same site; after you’re done, remove `using-astro` from the workflow so only `main` deploys—see comments in that file.)

### What the workflow does

- **Push to `main`:** tests → build → upload `dist/` → deploy with `actions/deploy-pages`.
- **Pull requests** into `main`: runs **tests and build** (no deploy). Coverage uploaded to Codecov.
- **Workflow dispatch:** run manually from **`main`** to deploy that ref.

Publishing uses the same workflow as [Astro’s GitHub guide](https://docs.astro.build/en/guides/deploy/github/). You can still run `npm run deploy` locally with `gh-pages` if needed; Actions is the recommended path.
