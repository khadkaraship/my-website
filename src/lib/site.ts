import { z } from 'zod';
import raw from '../../content/site.yaml';

/**
 * The shape of `content/site.yaml`.
 *
 * Every field has a sensible default, so deleting an optional line from the
 * YAML never crashes the site — it just falls back. If a value is the *wrong
 * kind* of thing (a number where text is expected, say), the build stops and
 * prints exactly which line is at fault.
 */
const link = z.object({
  label: z.string(),
  href: z.string(),
});

const button = z.object({
  show: z.boolean().default(true),
  label: z.string().default(''),
  href: z.string().default('#'),
});

const schema = z.object({
  name: z.string().default('Your Name'),
  brand: z.string().default('YOUR NAME'),
  role: z.string().default(''),
  tagline: z.string().default(''),

  theme: z
    .object({
      background: z.string().default('#f2f2f3'),
      text: z.string().default('#1d1f20'),
      accent: z.string().default('#5980a6'),
      accentDark: z.string().default('#1d2d3d'),
      headingFont: z.string().default('Barlow Condensed'),
      bodyFont: z.string().default('Barlow'),
      /**
       * The design system tints every photo with the accent colour, which is
       * what gives the site its blueprint look. Set to false for full-colour
       * photographs.
       */
      photoTint: z.boolean().default(true),
      /**
       * The little cross marks at the corners of photos, cards and the project
       * sidebar — the drafting-sheet motif. Set to false for plain frames.
       */
      frameMarks: z.boolean().default(true),
    })
    .default({}),

  nav: z
    .object({
      links: z.array(link).default([]),
      button: button.default({}),
    })
    .default({}),

  hero: z
    .object({
      eyebrow: z.string().default(''),
      headingLines: z.array(z.string()).default([]),
      intro: z.string().default(''),
      primaryButton: button.default({}),
      secondaryButton: button.default({}),
      portrait: z.string().default(''),
      portraitAlt: z.string().default(''),
    })
    .default({}),

  stats: z
    .object({
      show: z.boolean().default(true),
      items: z
        .array(z.object({ value: z.union([z.string(), z.number()]), label: z.string() }))
        .default([]),
    })
    .default({}),

  experience: z
    .object({
      show: z.boolean().default(true),
      number: z.string().default('01'),
      kicker: z.string().default('Experience'),
      heading: z.string().default(''),
      items: z
        .array(
          z.object({
            period: z.string().default(''),
            periodNote: z.string().default(''),
            title: z.string(),
            description: z.string().default(''),
            note: z.string().default(''),
          }),
        )
        .default([]),
    })
    .default({}),

  expertise: z
    .object({
      show: z.boolean().default(true),
      number: z.string().default('02'),
      kicker: z.string().default('Expertise'),
      heading: z.string().default(''),
      cards: z.array(z.object({ title: z.string(), description: z.string().default('') })).default([]),
      toolsLabel: z.string().default('Tools'),
      tools: z.array(z.string()).default([]),
    })
    .default({}),

  selectedWork: z
    .object({
      show: z.boolean().default(true),
      number: z.string().default('03'),
      kicker: z.string().default('Selected work'),
      heading: z.string().default(''),
      linkLabel: z.string().default('All projects →'),
      count: z.number().int().min(1).max(12).default(3),
    })
    .default({}),

  portfolio: z
    .object({
      kicker: z.string().default('Portfolio'),
      intro: z.string().default(''),
      columns: z.number().int().min(2).max(4).default(3),
      categories: z.array(z.string()).default([]),
    })
    .default({}),

  contact: z
    .object({
      show: z.boolean().default(true),
      number: z.string().default('04'),
      kicker: z.string().default('Contact'),
      heading: z.string().default(''),
      text: z.string().default(''),
      email: z.string().default(''),
      phone: z.string().default(''),
      links: z.array(link).default([]),
    })
    .default({}),

  footer: z
    .object({
      left: z.string().default(''),
      right: z.string().default(''),
    })
    .default({}),
});

const parsed = schema.safeParse(raw);

if (!parsed.success) {
  const problems = parsed.error.issues
    .map((i) => `  • ${i.path.join(' → ') || '(top level)'}: ${i.message}`)
    .join('\n');
  throw new Error(
    `\n\nThere is a problem in content/site.yaml:\n\n${problems}\n\n` +
      `Open content/site.yaml, fix the setting(s) listed above, and save.\n`,
  );
}

export const site = parsed.data;
export type Site = typeof site;

/** Google Fonts URL built from the two font names in site.yaml. */
export const fontsHref = (() => {
  const fam = (name: string, weights: string) =>
    `family=${encodeURIComponent(name).replace(/%20/g, '+')}:wght@${weights}`;
  const heading = fam(site.theme.headingFont, '400;500;600;700');
  const body = fam(site.theme.bodyFont, '300;400;500;600');
  return `https://fonts.googleapis.com/css2?${heading}&${body}&display=swap`;
})();
