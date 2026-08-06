import { getCollection, type CollectionEntry } from 'astro:content';
import { site } from './site';

export type Project = CollectionEntry<'projects'>;

/** Turn "River training" into "river-training" for use in a URL. */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * The URL for a project page. The number at the front of the file name is only
 * there to keep the folder tidy, so it is dropped from the address:
 * `content/projects/010-bhujel-gaun.md` → `/projects/bhujel-gaun`
 */
export function projectSlug(project: Project): string {
  return project.id.replace(/^\d+[-_]/, '');
}

export function projectUrl(project: Project): string {
  return `/projects/${projectSlug(project)}`;
}

/** All projects, in the order set by the `order:` field in each file. */
export async function allProjects(): Promise<Project[]> {
  const entries = await getCollection('projects');
  return entries.sort((a, b) => {
    const byOrder = a.data.order - b.data.order;
    return byOrder !== 0 ? byOrder : a.id.localeCompare(b.id);
  });
}

/** Projects shown on the home page: `featured: true` first, then the rest. */
export function featuredProjects(projects: Project[]): Project[] {
  const featured = projects.filter((p) => p.data.featured);
  const rest = projects.filter((p) => !p.data.featured);
  return [...featured, ...rest].slice(0, site.selectedWork.count);
}

/**
 * Filter categories for the portfolio page, with a live count each.
 * Categories come from site.yaml; any category with no projects is dropped so
 * the page never shows an empty filter.
 */
export function categoriesWithCounts(projects: Project[]) {
  return site.portfolio.categories
    .map((label) => ({
      label,
      slug: slugify(label),
      count: projects.filter((p) => p.data.type === label).length,
    }))
    .filter((c) => c.count > 0);
}

/**
 * The span of fiscal years covered by the projects, e.g. "2080–2083".
 * Worked out from the files so the portfolio heading never goes stale.
 */
export function fyRange(projects: Project[]): string {
  const years = projects
    .map((p) => Number.parseInt(p.data.fy.split('/')[0] ?? '', 10))
    .filter((n) => Number.isFinite(n));
  if (years.length === 0) return '';
  const from = Math.min(...years);
  const to = Math.max(...years) + 1;
  return from === to ? String(from) : `${from}–${to}`;
}

/** One line of metadata: "Tansen, Palpa · Hints Consult · FY 2080/81". */
export function metaLine(project: Project): string {
  const { place, client, firm, fy } = project.data;
  return [place, client, firm, fy && `FY ${fy}`].filter(Boolean).join(' · ');
}

/** The project before and after this one, wrapping around at the ends. */
export function neighbours(projects: Project[], current: Project) {
  const i = projects.findIndex((p) => p.id === current.id);
  const count = projects.length;
  return {
    prev: projects[(i - 1 + count) % count],
    next: projects[(i + 1) % count],
  };
}
