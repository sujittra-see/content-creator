import { describe, it, expect } from 'vitest';
import { certificateSchema, experienceSchema } from '../contentSchemas';

const validExperience = {
  title: 'Test Project',
  role: 'Developer',
  category: 'professional' as const,
  dateRange: 'Jan - Jun 2025',
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

  it('allows an experience entry without a card image', () => {
    const { image, ...experienceWithoutImage } = validExperience;
    const result = experienceSchema.safeParse(experienceWithoutImage);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.image).toBeUndefined();
    }
  });

  it('rejects invalid category', () => {
    const result = experienceSchema.safeParse({
      ...validExperience,
      category: 'invalid',
    });

    expect(result.success).toBe(false);
  });

  it('requires core fields', () => {
    const { title, ...rest } = validExperience;
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

  it('allows safe https externalUrl', () => {
    const result = experienceSchema.safeParse({
      ...validExperience,
      externalUrl: 'https://example.com',
    });

    expect(result.success).toBe(true);
  });

  it('rejects unsafe externalUrl protocols', () => {
    for (const externalUrl of ['javascript:alert(1)', 'data:text/html,test', 'http://example.com']) {
      const result = experienceSchema.safeParse({
        ...validExperience,
        externalUrl,
      });

      expect(result.success).toBe(false);
    }
  });

  it('allows only safe Figma embed URLs', () => {
    const result = experienceSchema.safeParse({
      ...validExperience,
      figmaEmbedUrl: 'https://www.figma.com/embed?embed_host=astra&url=https://www.figma.com/file/example-restaurant-search',
    });

    expect(result.success).toBe(true);
  });

  it('rejects unsafe or non-Figma embed URLs', () => {
    for (const figmaEmbedUrl of [
      'https://evil.example/embed?url=https://www.figma.com/file/x',
      'https://www.figma.com/embed?url=javascript:alert(1)',
      'http://www.figma.com/embed?url=https://www.figma.com/file/x',
    ]) {
      const result = experienceSchema.safeParse({
        ...validExperience,
        figmaEmbedUrl,
      });

      expect(result.success).toBe(false);
    }
  });
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

  it('rejects unsafe image values', () => {
    for (const image of ['data:image/svg+xml;base64,test', 'javascript:alert(1)', 'images/cert.jpg', '/content-creator/assets/cert.jpg']) {
      const result = certificateSchema.safeParse({
        ...validCertificate,
        image,
      });

      expect(result.success).toBe(false);
    }
  });
});
