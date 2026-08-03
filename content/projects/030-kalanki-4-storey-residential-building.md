---
# ── PROJECT FILE ────────────────────────────────────────────────────────────
# Copy this whole file and rename it to add a new project.
# Delete the file to remove the project from the site.

name: '4-Storey Residential Building'

# Must match one of the categories in content/site.yaml → portfolio.categories
type: 'Structural'

place: 'Kalanki, Kathmandu'
client: 'Freelance'
fy: '2082/83'

# Lower numbers appear first. Leave gaps (10, 20, 30…) so you can slot new
# projects in between without renumbering everything.
order: 30

# true = show this project on the home page's "Selected work" row.
featured: true

# ── PHOTOS ──────────────────────────────────────────────────────────────────
# Put image files in the public/images/ folder, then write the file name
# below like this:  cover: '/images/bhujel-source.jpg'
# Leave the cover blank ('') and the site shows a tidy empty frame instead.
images:
  cover: ''
  coverCaption: 'ETABS 3D model'

  # Extra photos, as many or as few as you like. Copy an "- image:" pair to add
  # another; delete them all and the project page simply shows the cover.
  gallery: []
  # gallery:
  #   - image: '/images/example-drawing.jpg'
  #     caption: 'Layout plan'
  #   - image: '/images/example-site.jpg'
  #     caption: 'Intake under construction'


# ── WHAT YOU DID ────────────────────────────────────────────────────────────
work:
  - '2D drawings'
  - '3D model'
  - 'Structural & foundation analysis'
  - 'Municipal approval works'

tools:
  - 'ETABS'
  - 'SAFE'
  - 'AutoCAD'
---

<!-- Anything written below the line above appears as extra text on the
     project page. You can delete it, or write a few paragraphs about the
     project. Leave it empty and the page simply skips it. -->
