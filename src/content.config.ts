import { defineCollection } from 'astro:content';
import { certificateSchema, experienceSchema } from './contentSchemas';

const experiences = defineCollection({
  type: 'content',
  schema: experienceSchema,
});

const certificates = defineCollection({
  type: 'content',
  schema: certificateSchema,
});

export const collections = { experiences, certificates };
