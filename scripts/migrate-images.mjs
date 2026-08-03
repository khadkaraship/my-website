// One-off migration: the fixed main/second/third photo slots become a cover
// photo plus a variable-length gallery. Delete this file once it has run.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..', 'content', 'projects');

for (const file of readdirSync(dir).filter((f) => f.endsWith('.md'))) {
  const path = join(dir, file);
  const text = readFileSync(path, 'utf8');

  const caption = text.match(/^  mainCaption: (.*)$/m)?.[1] ?? "''";
  const main = text.match(/^  main: (.*)$/m)?.[1] ?? "''";

  const oldBlock =
    /# ── PHOTOS ─+\n(?:#.*\n)*images:\n(?:  .*\n)*/;

  const newBlock = `# ── PHOTOS ──────────────────────────────────────────────────────────────────
# Put image files in the public/images/ folder, then write the file name
# below like this:  cover: '/images/bhujel-source.jpg'
# Leave the cover blank ('') and the site shows a tidy empty frame instead.
images:
  cover: ${main}
  coverCaption: ${caption}

  # Extra photos, as many or as few as you like. Copy an "- image:" pair to add
  # another; delete them all and the project page simply shows the cover.
  gallery: []
  # gallery:
  #   - image: '/images/example-drawing.jpg'
  #     caption: 'Layout plan'
  #   - image: '/images/example-site.jpg'
  #     caption: 'Intake under construction'

`;

  if (!oldBlock.test(text)) {
    console.warn(`skipped (unexpected shape): ${file}`);
    continue;
  }
  writeFileSync(path, text.replace(oldBlock, newBlock), 'utf8');
}

console.log('Migrated project photo fields.');
