# Content Creator Portfolio

Astro portfolio site configured for GitHub Pages.

## Local Development

```bash
npm install
npm run dev
```

## Verify Before Deploying

```bash
npm run lint
npm run test
npm run build
```

The production build is written to `dist/`.

## GitHub Pages Deployment

This repository is configured as a GitHub Pages project site:

- Site URL: `https://sujittra-see.github.io/content-creator/`
- Astro `site`: `https://sujittra-see.github.io`
- Astro `base`: `/content-creator/`

Deployment runs automatically on pushes to `main` using `.github/workflows/deploy.yml`. It can also be started manually from the GitHub Actions tab with **Deploy to GitHub Pages**.

In GitHub, set **Settings > Pages > Build and deployment > Source** to **GitHub Actions**.

If this project is moved to a user site repository named `sujittra-see.github.io`, change `base` in `astro.config.mjs` to `/`.
