import { z } from 'astro/zod';
import { isAllowedImageSource } from './utils/image';
import { isSafeFigmaEmbedUrl, isSafeHttpsUrl } from './utils/url';

const imageSourceSchema = z.string().refine(isAllowedImageSource, 'Image must be a local image path or an https URL');

export const experienceSchema = z.object({
  title: z.string(),
  role: z.string(),
  category: z.enum(['professional', 'academic']),
  dateRange: z.string(),
  tags: z.array(z.string()),
  tools: z.array(z.string()).optional(),
  metrics: z.string().optional(),
  image: imageSourceSchema.optional(),
  featured: z.boolean().default(false),
  order: z.number(),
  figmaEmbedUrl: z.string().refine(isSafeFigmaEmbedUrl, 'Figma embed URL must be a safe https://www.figma.com/embed URL').optional(),
  externalUrl: z.string().refine(isSafeHttpsUrl, 'External URL must use https').optional(),
});

export const certificateSchema = z.object({
  title: z.string(),
  issuer: z.string(),
  date: z.string(),
  image: imageSourceSchema,
});
