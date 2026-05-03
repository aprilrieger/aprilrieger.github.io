# FlyingSquirrel site

Personal GitHub Pages site for **FlyingSquirrel** (infrastructure consulting), built with **Gatsby 5** + **Tailwind**.

## Prerequisites

Node 18+ (CI uses Node 20).

## Develop

```bash
npm install
npm run develop
```

## Production build

```bash
npm run build
npm run serve
```

## Deploy

Pushes to `main` run [`.github/workflows/gatsby.yml`](.github/workflows/gatsby.yml) and publish to GitHub Pages.

Historical **gatsby-theme-portfolio-minimal** snapshot: branch `archive/gatsby-portfolio-theme`.
