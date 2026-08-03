# Raship Khadka — portfolio site

Static portfolio site built from the "Portfolio Site" Claude Design project.

**If you only want to change text, photos or colours, read [EDITING.md](EDITING.md)
instead — you never need to open a code file.**

## Stack

| | |
| --- | --- |
| Framework | [Astro 5](https://astro.build), static output — no JavaScript is shipped to the browser |
| Content | `content/site.yaml` + one Markdown file per project in `content/projects/` |
| Validation | Zod schemas — a bad value stops the build with a plain-English message |
| Styling | The design system's `styles.css`, copied verbatim, plus page CSS. Brand colours and fonts are injected as token overrides from `site.yaml` |
| Editing UI | [Sveltia CMS](https://github.com/sveltia/sveltia-cms) at `/admin` |

## Run it

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # writes dist/
npm run preview   # serve the built site
```

## Layout of the code

```
content/
  site.yaml                  every piece of text and every setting
  projects/*.md              one file per project
public/
  admin/config.yml           the form definitions for the /admin editor
  images/  files/            photos and the résumé PDF
src/
  content.config.ts          schema for project files
  lib/site.ts                loads + validates site.yaml, derives the font URL
  lib/projects.ts            sorting, slugs, filtering, prev/next
  layouts/Base.astro         <head>, theme overrides, nav, contact band, footer
  components/                Frame, ProjectCard, SiteNav, ContactBand
  pages/
    index.astro              home
    portfolio/[...filter]    /portfolio and /portfolio/<category>
    projects/[slug].astro    one page per project
    admin/index.astro        loads Sveltia CMS; forms come from public/admin/config.yml
    404.astro
  styles/
    design-system.css        copied from the design project — don't edit
    site.css                 page layout and responsive rules
```

### Notes on the port from the design file

- The design switched layouts by measuring `window.innerWidth` in JavaScript.
  That is now plain CSS media queries (`< 760px`, `760–1079px`, `≥ 1080px`), so
  the right layout is in the HTML at first paint and there is no layout shift.
- Client-side page switching became real URLs: `/`, `/portfolio`,
  `/portfolio/irrigation`, `/projects/<name>`. Each is shareable and indexable.
- Category filters are static pages rather than JavaScript state, so filtering
  works with JavaScript disabled.
- `<image-slot>` (the drag-and-drop placeholder from the design canvas) became
  `Frame.astro`: it shows the photo when one is set and a hatched placeholder
  with the caption when it isn't.
- The nine hard-coded accent shades are now derived from the single `accent`
  colour in `site.yaml`, so re-branding is one line instead of nine.
- Project counts, filter counts and the fiscal-year range in the portfolio
  heading are all computed from the project files.

## Publishing

Push the repo to GitHub, then connect it to **Netlify** or **Cloudflare Pages**:

- Build command: `npm run build`
- Publish directory: `dist`

(`netlify.toml` already sets both.) Every push rebuilds and redeploys the site,
including saves made from `/admin`.

Two things to update once you have a domain:

1. `astro.config.mjs` → `SITE_URL`
2. `public/admin/config.yml` → `repo:`

## Scripts

`scripts/seed-projects.mjs` generated the initial twelve project files. It has
done its job and can be deleted.
