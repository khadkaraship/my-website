# Raship Khadka — portfolio site

Static portfolio site built from the "Portfolio Site" Claude Design project.

**If you only want to change text, photos or colours, read [EDITING.md](EDITING.md)
instead — you never need to open a code file.**

For why the code is shaped the way it is, see [DESIGN.md](DESIGN.md).

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

## Publishing

Hosted on **Cloudflare Pages**. Dashboard → Workers & Pages → Create → Pages →
Connect to Git, pick the repo, then:

- Build command: `npm run build`
- Build output directory: `dist`

Nothing in the repo needs configuring — the site is served from the domain root,
so all internal links work as written. Every push rebuilds and redeploys,
including saves made from `/admin`.

Two things to update once the site is live:

1. `astro.config.mjs` → `SITE_URL` (your `*.pages.dev` address or custom domain)
2. `public/admin/config.yml` → `repo:`

## Scripts

`scripts/seed-projects.mjs` generated the initial twelve project files. It has
done its job and can be deleted.
