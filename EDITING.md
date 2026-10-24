# How to change the website

**You never need to touch code to update this site.** Everything lives in one
folder: `content/`.

```
content/
  site.yaml        ← all the text, colours, contact details, on/off switches
  projects/        ← one file per project
  categories/      ← one file per portfolio filter button
public/
  images/          ← your photos go here
  files/           ← your résumé PDF goes here
```

There are two ways to edit. Pick whichever you prefer.

---

## Option A — the visual editor (recommended, no code at all)

A form-based editor is built in at **`/admin`**. It gives you text boxes, colour
pickers, on/off switches and drag-and-drop photo upload.

**On your own computer:**

1. Open Terminal, go to this folder, and run `npm run dev`.
2. Open **Chrome or Edge** at <http://localhost:4321/admin>.
3. Click **"Work with Local Repository"** and choose this project folder.
4. Edit, press **Save**. The site updates instantly in the other tab.

Nothing to install and no login needed — this works today.

> One-time setup: open `public/admin/config.yml` and change the `repo:` line to
> your GitHub username and repository name.

**From any computer, once the site is online** (see "Publishing" in
`README.md`), you can open `yoursite.com/admin`, sign in with GitHub and save —
the live site rebuilds itself a minute later.

That remote sign-in needs one extra piece of setup, because GitHub requires a
site to identify itself before it will let anyone log in:

1. Deploy a free copy of <https://github.com/sveltia/sveltia-cms-auth>
   (a Cloudflare Worker — the README there is a click-by-click guide).
2. Create a GitHub OAuth app pointing at it, as that README describes.
3. Uncomment the `base_url:` line in `public/admin/config.yml` and put your
   worker's address there.

If you'd rather skip that, the local editor above does everything the online one
does — you just have to be at your own computer.

---

## Option B — edit the text files directly

Open the files in any plain-text editor (VS Code, TextEdit, Notepad).

### Three rules

1. **Keep the spaces at the start of each line exactly as they are.** The
   indentation is what tells the file which setting belongs to which section.
2. **Only change what comes after the `:`.**
3. Lines starting with `#` are notes to you. They never appear on the site.

### Common jobs

| I want to… | Do this |
| --- | --- |
| Change my phone number or email | `content/site.yaml` → the `contact:` section |
| Change the colours | `content/site.yaml` → `theme:` — paste any hex code like `#8a4b2a` |
| Change the font | `content/site.yaml` → `theme:` → `headingFont` / `bodyFont`. Use any name from [fonts.google.com](https://fonts.google.com), spelled exactly as Google spells it |
| Hide a whole section | Find its `show: true` and change it to `show: false` |
| Add a job to the timeline | `content/site.yaml` → `experience:` → copy a whole `- period:` block and edit it |
| Add a published paper | Visual editor → Site settings → **Publications** → Add. Or `content/site.yaml` → `publications:` → `items:`. The section appears on the home page once there is at least one paper. A PDF copy goes in `public/files/` |
| Change how many projects show on the home page | `content/site.yaml` → `selectedWork:` → `count:` |
| Change the portfolio layout | `content/site.yaml` → `portfolio:` → `columns:` (2, 3 or 4) |
| Add, rename or remove a filter button | See "Categories" below |

---

## Adding a project

1. Go into `content/projects/`.
2. **Copy any existing file** and rename it. The name should be
   `NUMBER-short-name.md`, e.g. `035-tinau-river-training.md`. The number
   controls the order — lower numbers appear first.
3. Open the copy and change the values at the top.
4. Save. Done — the project page, the portfolio card and the filter counts all
   appear on their own.

To **remove** a project, delete its file. To **reorder**, change the `order:`
number inside the file.

### What goes in a project file

```yaml
name: 'Tinau River Training Works'
type: 'River training'      # must match a category name in content/categories/
place: 'Butwal, Rupandehi'
client: 'Butwal Sub-Metropolitan City'   # leave as '' to hide this row
firm: 'Hints Consult Pvt. Ltd.'          # leave as '' to hide this row
fy: '2082/83'
order: 35                   # lower = earlier
featured: true              # true = also show it on the home page
images:
  cover: '/images/tinau-site.jpg'
  coverCaption: 'Gabion spur under construction'
  gallery:                      # as many or as few as you like — or none
    - image: '/images/tinau-plan.jpg'
      caption: 'Spur layout plan'
work:
  - 'Hydrological analysis'
  - 'Engineering drawings'
tools:
  - 'HEC-RAS'
  - 'AutoCAD'
```

Anything you type *below* the second `---` line becomes extra paragraphs on the
project page. Leave it empty and the page simply skips it.

---

## Categories

Categories are the filter buttons on the portfolio page (Water supply,
Irrigation, …). Each one is a small file in `content/categories/`.

**In the visual editor:** click **Categories** in the left menu.

- **Add one:** click **New Category**, type the name, save. It now appears in
  the Category dropdown on every project.
- **Remove one:** open it and click **Delete**.
- **Rename one:** change the name and save, then open each project that used
  the old name and pick the new one from its Category dropdown. Projects are
  not updated for you.
- **Reorder the buttons:** change **Button position**. Lower numbers show first.

**In the text files:** copy any file in `content/categories/`, rename it, and
change the values inside:

```yaml
name: 'Bridge design'
order: 8        # position of the button — lower shows first
```

To remove one, delete its file.

Good to know:

- A button only appears once at least one project uses that category, so
  you can add categories before you have projects for them.
- A project whose category was deleted or renamed still shows under **All**.
  It just has no filter button until you give it a category that exists. The
  build log warns about these projects by name.
- Capital letters don't matter when matching: "River Training" and
  "River training" count as the same category.

---

## Adding photos

1. Drop the image file into `public/images/`.
2. Write its name in the project file, starting with `/images/`:
   `cover: '/images/tinau-site.jpg'`

**How many photos per project?** Any number. The `cover` is the one that shows
on the cards; everything under `gallery:` appears below it on the project page:

| Photos in `gallery` | What the project page shows |
| --- | --- |
| none | just the cover — no empty frames |
| one | one full-width photo under the cover |
| two or more | a two-across grid |

Notes:

- Leave the cover blank (`''`) and the site shows a neat empty frame with your
  caption in it — nothing looks broken while you're still gathering photos.
- Photos are tinted with the accent colour by default — that's what gives the
  site its blueprint look. For full-colour photographs, set
  `photoTint: false` under `theme:` in `content/site.yaml`.
- The small cross marks at the corners of photos, cards and the project sidebar
  are the drafting-sheet motif. Set `frameMarks: false` under `theme:` for plain
  frames instead.
- Use lowercase file names with dashes, no spaces: `tinau-site.jpg`, not
  `Tinau Site.JPG`.
- Resize photos to about **1600px wide** before adding them, so pages load fast.

## Adding your résumé

**In the visual editor:** Site settings → **Résumé (PDF)** → upload the new
file → Save. Every button whose link is set to `resume` opens it, whatever the
file is called.

**By hand:** overwrite `public/files/resume.pdf` with the new file, keeping that
name.

To make any other button or contact link open the résumé, set its link to
`resume`.

---

## If something breaks

The site refuses to build rather than publishing a broken page, and it tells you
exactly what is wrong — for example:

```
There is a problem in content/site.yaml:
  • portfolio → columns: Number must be less than or equal to 4
```

Fix the line it names and save. Almost every error is one of:

- a missing or extra space at the start of a line,
- a missing `:` after a setting name,
- text with a `:` inside it that isn't wrapped in quotes.
