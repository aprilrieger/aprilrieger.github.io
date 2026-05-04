import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const caseStudies = defineCollection({
  loader: glob({
    pattern: "**/*.mdx",
    base: new URL("./content/caseStudies/", import.meta.url),
  }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    published: z.boolean().default(true),
    featured: z.boolean().default(false),
    company: z.string().optional(),
    client: z.string().optional(),
    stack: z.array(z.string()),
    metrics: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
        }),
      )
      .optional(),
  }),
});

const blog = defineCollection({
  loader: glob({
    pattern: "**/*.mdx",
    base: new URL("./content/blog/", import.meta.url),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedDate: z.coerce.date(),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
  }),
});

const bio = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: new URL("./content/bio/", import.meta.url),
  }),
  schema: z.object({
    title: z.string().optional(),
  }),
});

const legal = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: new URL("./content/legal/", import.meta.url),
  }),
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = { caseStudies, blog, bio, legal };
