import { defineCollection, z } from 'astro:content';

const experiences = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    role: z.string(),
    category: z.enum(['professional', 'academic']),
    dateRange: z.string(),
    tags: z.array(z.string()),
    tools: z.array(z.string()).optional(),
    metrics: z.string().optional(),
    image: z.string(),
    featured: z.boolean().default(false),
    order: z.number(),
    figmaEmbedUrl: z.string().optional(),
    externalUrl: z.string().optional(),
  }),
});

const certificates = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    issuer: z.string(),
    date: z.string(),
    image: z.string(),
  }),
});

export const collections = { experiences, certificates };
