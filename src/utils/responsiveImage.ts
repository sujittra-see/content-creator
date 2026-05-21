import { getLocalImagePath, imagePath } from './image';

export const RESPONSIVE_WIDTHS = [480, 960, 1600] as const;

type ResponsiveWidth = (typeof RESPONSIVE_WIDTHS)[number];

export interface ResponsiveImageSources {
  src: string;
  webpSrcset?: string;
  jpegSrcset?: string;
  width: number;
  height: number;
}

function optimizedPath(localPath: string, width: ResponsiveWidth, extension: 'webp' | 'jpg'): string {
  const withoutExtension = localPath.replace(/\.[a-z0-9]+$/i, '');
  return `${withoutExtension.replace('/images/', '/images/optimized/')}-${width}.${extension}`;
}

function srcsetFor(localPath: string, extension: 'webp' | 'jpg'): string {
  return RESPONSIVE_WIDTHS.map((width) => `${imagePath(optimizedPath(localPath, width, extension))} ${width}w`).join(', ');
}

export function getResponsiveImageSources(src: string, width: number, height: number): ResponsiveImageSources {
  const resolved = imagePath(src);
  const localPath = getLocalImagePath(src);

  if (!localPath) {
    return { src: resolved, width, height };
  }

  return {
    src: resolved,
    webpSrcset: srcsetFor(localPath, 'webp'),
    jpegSrcset: srcsetFor(localPath, 'jpg'),
    width,
    height,
  };
}
