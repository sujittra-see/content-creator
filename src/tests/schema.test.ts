import { describe, it, expect } from 'vitest';
import { z } from 'astro/zod';

const experienceSchema = z.object({
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
});

const validExperience = {
  title: 'Test Project',
  role: 'Developer',
  category: 'professional' as const,
  dateRange: 'Jan – Jun 2025',
  tags: ['Dev', 'UX'],
  image: '/images/test.jpg',
  order: 1,
};

describe('Experience Schema Validation', () => {
  it('validates a complete professional experience entry', () => {
    const result = experienceSchema.safeParse(validExperience);
    expect(result.success).toBe(true);
  });

  it('validates an academic experience entry', () => {
    const result = experienceSchema.safeParse({
      ...validExperience,
      category: 'academic',
      featured: true,
      metrics: '100 views',
      tools: ['Figma', 'VS Code'],
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.category).toBe('academic');
      expect(result.data.featured).toBe(true);
    }
  });

  it('rejects invalid category', () => {
    const result = experienceSchema.safeParse({
      ...validExperience,
      category: 'invalid',
    });
    expect(result.success).toBe(false);
  });

  it('requires title field', () => {
    const { title, ...rest } = validExperience;
    const result = experienceSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  it('requires role field', () => {
    const { role, ...rest } = validExperience;
    const result = experienceSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  it('requires order to be a number', () => {
    const result = experienceSchema.safeParse({
      ...validExperience,
      order: '1',
    });
    expect(result.success).toBe(false);
  });

  it('allows optional metrics to be undefined', () => {
    const result = experienceSchema.safeParse(validExperience);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.metrics).toBeUndefined();
    }
  });

  it('allows optional externalUrl', () => {
    const result = experienceSchema.safeParse({
      ...validExperience,
      externalUrl: 'https://example.com',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.externalUrl).toBe('https://example.com');
    }
  });
});

const certificateSchema = z.object({
  title: z.string(),
  issuer: z.string(),
  date: z.string(),
  image: z.string(),
});

describe('Certificate Schema Validation', () => {
  const validCertificate = {
    title: 'Test Cert',
    issuer: 'Test Issuer',
    date: '2025',
    image: '/images/cert.jpg',
  };

  it('validates a complete certificate entry', () => {
    const result = certificateSchema.safeParse(validCertificate);
    expect(result.success).toBe(true);
  });

  it('requires all fields', () => {
    const { title, ...rest } = validCertificate;
    const result = certificateSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  it('requires image field', () => {
    const { image, ...rest } = validCertificate;
    const result = certificateSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });
});
