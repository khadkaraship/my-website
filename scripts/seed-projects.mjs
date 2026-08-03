// One-off seed script: writes the initial project files into content/projects/.
// You can delete this file — it is not part of the website.
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dir = join(root, 'content', 'projects');
mkdirSync(dir, { recursive: true });

const WS = 'Water supply', IR = 'Irrigation', RT = 'River training', ST = 'Structural';
const HINTS = 'Hints Consult Pvt. Ltd.';

const projects = [
  { slug: 'bhujel-gaun-lift-water-supply', name: 'Bhujel Gaun Lift Water Supply Project', type: WS, place: 'Bandipur RM, Tanahun', client: HINTS, fy: '2082/83', featured: true, shot: 'Spring source in forest',
    work: ['Topographic survey', 'Hydraulic design', 'Estimation & costing', 'Engineering drawings', 'DPR preparation'], tools: ['AutoCAD', 'EPANET', 'SW-WSP', 'ArcGIS Pro'] },
  { slug: 'chainpur-jhanjhane-shreepur-lift-irrigation', name: 'Chainpur–Jhanjhane–Shreepur Lift Irrigation Project', type: IR, place: 'Hariharpur Gadi RM, Sindhuli', client: HINTS, fy: '2081/82', featured: true, shot: 'Command area',
    work: ['Hydrological & economic analysis', 'Structure design', 'GIS mapping', 'DPR preparation'], tools: ['ArcGIS Pro', 'HEC-RAS', 'SW-Canal', 'AutoCAD'] },
  { slug: 'kalanki-4-storey-residential-building', name: '4-Storey Residential Building', type: ST, place: 'Kalanki, Kathmandu', client: 'Freelance', fy: '2082/83', featured: true, shot: 'ETABS 3D model',
    work: ['2D drawings', '3D model', 'Structural & foundation analysis', 'Municipal approval works'], tools: ['ETABS', 'SAFE', 'AutoCAD'] },
  { slug: 'aandhikhola-river-training-works', name: 'Aandhikhola River Training Works', type: RT, place: 'Bhirkot & Waling, Syangja', client: HINTS, fy: '2080/81', shot: 'Total station survey',
    work: ['Hydrological analysis', 'Engineering drawings', 'Report preparation'], tools: ['HEC-RAS', 'AutoCAD', 'ArcGIS Pro'] },
  { slug: 'bhulke-lift-water-supply', name: 'Bhulke Lift Water Supply Project', type: WS, place: 'Tansen Municipality, Palpa', client: HINTS, fy: '2080/81', shot: 'Reservoir tank site',
    work: ['Hydraulic design', 'Engineering drawings'], tools: ['AutoCAD', 'EPANET', 'SW-WSP'] },
  { slug: 'ramtar-water-supply', name: 'Ramtar Water Supply Project', type: WS, place: 'Rampur Municipality, Palpa', client: HINTS, fy: '2080/81', shot: 'Distribution line alignment',
    work: ['Hydraulic design', 'Engineering drawings'], tools: ['AutoCAD', 'EPANET'] },
  { slug: 'dhodeni-padhero-water-supply', name: 'Dhodeni Padhero Water Supply Project', type: WS, place: 'Location to confirm', client: HINTS, fy: '2080/81', shot: 'Spring intake',
    work: ['Hydraulic design', 'Engineering drawings', 'Estimation'], tools: ['AutoCAD', 'EPANET'] },
  { slug: 'yutuki-lift-irrigation', name: 'Yutuki Lift Irrigation Project', type: IR, place: 'Dakshinkali, Kathmandu', client: HINTS, fy: '2081/82', shot: 'Pump house site',
    work: ['Hydrological analysis', 'Structure design', 'Engineering drawings'], tools: ['AutoCAD', 'SW-Canal', 'ArcGIS Pro'] },
  { slug: 'karango-kulo-irrigation', name: 'Karango Kulo Irrigation Project', type: IR, place: 'Shankharapur, Kathmandu', client: HINTS, fy: '2081/82', shot: 'Canal alignment',
    work: ['Hydrological analysis', 'Canal design', 'Estimation'], tools: ['AutoCAD', 'SW-Canal'] },
  { slug: 'ghatte-khola-irrigation', name: 'Ghatte Khola Irrigation Project', type: IR, place: 'Shankharapur, Kathmandu', client: HINTS, fy: '2081/82', shot: 'Intake structure',
    work: ['Hydrological analysis', 'Structure design', 'Engineering drawings'], tools: ['AutoCAD', 'SW-Canal'] },
  { slug: 'chyadra-khola-irrigation', name: 'Chyadra Khola Irrigation Project', type: IR, place: 'Rapti RM, Chitwan', client: HINTS, fy: '2080/81', shot: 'Khola crossing',
    work: ['Hydrological analysis', 'Engineering drawings'], tools: ['AutoCAD', 'HEC-RAS'] },
  { slug: 'mulabari-khola-irrigation', name: 'Mulabari Khola Irrigation Project', type: IR, place: 'Kalika, Chitwan', client: HINTS, fy: '2080/81', shot: 'Field survey',
    work: ['Hydrological analysis', 'Engineering drawings'], tools: ['AutoCAD', 'HEC-RAS'] },
];

const q = (s) => `'${String(s).replace(/'/g, "''")}'`;
const list = (arr) => arr.map((v) => `  - ${q(v)}`).join('\n');

projects.forEach((p, i) => {
  const order = String((i + 1) * 10).padStart(3, '0');
  const body = `---
# ── PROJECT FILE ────────────────────────────────────────────────────────────
# Copy this whole file and rename it to add a new project.
# Delete the file to remove the project from the site.

name: ${q(p.name)}

# Must match one of the categories in content/site.yaml → portfolio.categories
type: ${q(p.type)}

place: ${q(p.place)}
client: ${q(p.client)}
fy: ${q(p.fy)}

# Lower numbers appear first. Leave gaps (10, 20, 30…) so you can slot new
# projects in between without renumbering everything.
order: ${Number(order)}

# true = show this project on the home page's "Selected work" row.
featured: ${p.featured ? 'true' : 'false'}

# ── PHOTOS ──────────────────────────────────────────────────────────────────
# Put image files in the public/images/ folder, then write the file name
# below like this:  main: '/images/bhujel-source.jpg'
# Leave a photo blank ('') and the site shows a tidy empty frame instead.
images:
  main: ''
  mainCaption: ${q(p.shot)}
  second: ''
  secondCaption: 'Drawing or map'
  third: ''
  thirdCaption: 'Site or model view'

# ── WHAT YOU DID ────────────────────────────────────────────────────────────
work:
${list(p.work)}

tools:
${list(p.tools)}
---

<!-- Anything written below the line above appears as extra text on the
     project page. You can delete it, or write a few paragraphs about the
     project. Leave it empty and the page simply skips it. -->
`;
  writeFileSync(join(dir, `${order}-${p.slug}.md`), body, 'utf8');
});

console.log(`Wrote ${projects.length} project files to content/projects/`);
