import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Schema for the files in `content/projects/`.
 * If someone mistypes a field, the build stops with a readable message
 * instead of silently publishing a broken page.
 */
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/projects' }),
  schema: z.object({
    name: z.string(),
    type: z.string(),
    place: z.string().default(''),
    /** Who the work was for — the municipality, RM or owner. */
    client: z.string().default(''),
    /** Who you did it through — the consultancy, or "Freelance". */
    firm: z.string().default(''),
    fy: z.string().default(''),
    order: z.number().default(999),
    featured: z.boolean().default(false),
    images: z
      .object({
        /** Shown on the cards and at the top of the project page. */
        cover: z.string().default(''),
        coverCaption: z.string().default(''),
        /**
         * Any number of extra photos — none, one, or twenty. The project page
         * lays them out to suit however many there are, so a project with a
         * single photo never shows empty frames.
         */
        gallery: z
          .array(
            z.object({
              image: z.string(),
              caption: z.string().default(''),
            }),
          )
          .default([]),
      })
      .default({}),
    work: z.array(z.string()).default([]),
    tools: z.array(z.string()).default([]),
  }),
});

export const collections = { projects };
