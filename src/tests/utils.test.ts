import { describe, expect, it } from 'vitest';
import { getLocalImagePath, imagePath } from '../utils/image';
import { getResponsiveImageSources } from '../utils/responsiveImage';
import { getFigmaOpenUrl, isSafeFigmaEmbedUrl, sanitizeHttpsUrl } from '../utils/url';

describe('URL utilities', () => {
  it('sanitizes only https URLs', () => {
    expect(sanitizeHttpsUrl('https://example.com/path')).toBe('https://example.com/path');
    expect(sanitizeHttpsUrl('http://example.com/path')).toBeUndefined();
    expect(sanitizeHttpsUrl('javascript:alert(1)')).toBeUndefined();
    expect(sanitizeHttpsUrl('data:text/html,test')).toBeUndefined();
  });

  it('validates Figma embed URLs and derives the open URL safely', () => {
    const embedUrl = 'https://www.figma.com/embed?embed_host=astra&url=https://www.figma.com/proto/example';
    const protoEmbedUrl = 'https://embed.figma.com/proto/QtVABLRb8PNhDsgOwU9VxJ/DS?node-id=207-404&starting-point-node-id=207%3A404&embed-host=share';

    expect(isSafeFigmaEmbedUrl(embedUrl)).toBe(true);
    expect(getFigmaOpenUrl(embedUrl)).toBe('https://www.figma.com/proto/example');
    expect(isSafeFigmaEmbedUrl(protoEmbedUrl)).toBe(true);
    expect(getFigmaOpenUrl(protoEmbedUrl)).toBe('https://www.figma.com/proto/QtVABLRb8PNhDsgOwU9VxJ/DS?node-id=207-404&starting-point-node-id=207%3A404&embed-host=share');
    expect(isSafeFigmaEmbedUrl('https://www.figma.com/embed?url=https://evil.example/proto/example')).toBe(false);
    expect(isSafeFigmaEmbedUrl('https://embed.figma.com/file/QtVABLRb8PNhDsgOwU9VxJ/DS')).toBe(false);
  });
});

describe('Image utilities', () => {
  it('prefixes local image paths with the Astro base path', () => {
    expect(imagePath('/images/example.jpg')).toBe('/content-creator/images/example.jpg');
    expect(imagePath('/content-creator/images/example.jpg')).toBe('/content-creator/images/example.jpg');
  });

  it('normalizes base-prefixed local image paths for responsive variants', () => {
    expect(getLocalImagePath('/content-creator/images/example.jpg')).toBe('/images/example.jpg');

    const sources = getResponsiveImageSources('/content-creator/images/example.jpg', 400, 300);

    expect(sources.webpSrcset).toContain('/content-creator/images/optimized/example-480.webp 480w');
    expect(sources.jpegSrcset).toContain('/content-creator/images/optimized/example-1600.jpg 1600w');
  });

  it('rejects unsafe image protocols', () => {
    expect(() => imagePath('data:image/svg+xml;base64,test')).toThrow();
    expect(() => imagePath('javascript:alert(1)')).toThrow();
    expect(() => imagePath('/content-creator/assets/example.jpg')).toThrow();
    expect(() => imagePath('/images/../private/example.jpg')).toThrow();
  });

  it('generates optimized responsive sources for local images', () => {
    const sources = getResponsiveImageSources('/images/example.jpg', 400, 300);

    expect(sources.webpSrcset).toContain('/content-creator/images/optimized/example-480.webp 480w');
    expect(sources.jpegSrcset).toContain('/content-creator/images/optimized/example-1600.jpg 1600w');
    expect(sources.src).toBe('/content-creator/images/example.jpg');
  });
});
