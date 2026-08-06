# Design & implementation notes

Port of the Claude Design project *Portfolio Site* (`Portfolio Site.dc.html`) to
a static site. This is the "why" document — [README.md](README.md) covers how to
run it, [EDITING.md](EDITING.md) how to change content.

## Goal

Highly configurable by a non-technical person. That drove every decision below:
content lives in data files, not code, and the site is generated from them.

## Stack

| Layer | Choice | Reason |
| --- | --- | --- |
| Framework | Astro 5, static | Zero JS shipped; the design system's CSS drops in unchanged |
| Content | `content/site.yaml` + `content/projects/*.md` | YAML takes comments, so the file explains itself; one file per project means duplicate-to-add, delete-to-remove |
| Validation | Zod (`src/lib/site.ts`, `src/content.config.ts`) | A bad value fails the build with a plain-English message instead of shipping a broken page |
| Editing | Sveltia CMS at `/admin` | Forms, colour pickers, image upload — no text editor needed |
| Hosting | Netlify (`netlify.toml`) | Push → rebuild → live |

## Content model

```
content/site.yaml          everything that isn't a project
content/projects/NNN-*.md  one project each; NNN sets the order
public/images/             photos          public/files/  résumé PDF
```

Projects carry a `cover` plus a `gallery` list of any length. The project page
adapts: no gallery → cover alone; one → full-width; two or more → a grid. Empty
frames are never rendered, so a one-photo project doesn't look unfinished.

## Routes

File-based — the path under `src/pages/` *is* the URL.

| File | URL |
| --- | --- |
| `index.astro` | `/` |
| `portfolio/[...filter].astro` | `/portfolio`, `/portfolio/irrigation`, … |
| `projects/[slug].astro` | `/projects/<name>` |
| `admin/index.astro` | `/admin` |

## Theming

`content/site.yaml → theme` sets four colours and two fonts. `Base.astro`
injects these as overrides on the design system's tokens, and derives the nine
accent shades from the single `accent` value with `color-mix`. Re-branding is
one line, not nine.

Two switches control the borrowed blueprint styling: `photoTint` (the duotone
overlay that tints every photo with the accent colour) and `frameMarks` (the
corner cross marks on photos, cards and the project sidebar). Both default on,
matching the original design; either can be turned off without touching CSS.

## Notable changes from the design file

The design was a canvas prototype; these adapt it to a real site.

- **Breakpoints**: the prototype measured `window.innerWidth` in JS and stored it
  in state. Now plain media queries (`<760`, `760–1079`, `≥1080`), so the right
  layout is in the HTML at first paint with no layout shift.
- **Navigation**: client-side `state.page` switching became real URLs. Each page
  is shareable and indexable.
- **Filters**: category chips are static pages, not JS state — they work with
  JavaScript disabled and each filtered view has its own address.
- **Images**: `<image-slot>` (the canvas's drag-and-drop placeholder) became
  `Frame.astro` — shows the photo if set, a hatched placeholder with the caption
  if not.
- **Timeline rule**: the original spanned a grid element across rows. That only
  works for a fixed row count, so it's now a left border on each entry and stays
  continuous however many jobs you add.
- **Derived values**: project counts, filter counts, the fiscal-year range in the
  portfolio heading, and prev/next links are computed from the files rather than
  typed in.

## Verified

Build produces 20 static pages. Checked at 1280px and 390px (0px horizontal
overflow), across home, portfolio, and project pages with 0, 1 and 2 photos.
Theme and `photoTint` toggles confirmed to propagate.

## Known caveats

1. **The CMS strips YAML comments.** Saving `content/site.yaml` through `/admin`
   re-serialises it and drops the explanatory `#` comments. Values are safe.
   Guidance also lives in `EDITING.md`, and the CMS shows its own field hints.
2. **Remote `/admin` sign-in needs an OAuth client.** GitHub requires a site to
   identify itself. Until one is set up, `api.netlify.com/auth` returns 404 —
   see the two options in `EDITING.md`. Local editing needs no setup.
3. **Two places describe the same data.** `public/admin/config.yml` (forms) and
   the Zod schemas (validation). Adding a field to one without the other means
   it's silently dropped or fails the build.
4. **`SITE_URL` in `astro.config.mjs`** is still `https://example.com`. Affects
   social-share previews only.
