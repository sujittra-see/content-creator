const DEFAULT_BASE = '/content-creator/';
const LOCAL_IMAGES_PREFIX = '/images/';

const rawBasePath = import.meta.env.MODE === 'test' ? DEFAULT_BASE : (import.meta.env.BASE_URL ?? DEFAULT_BASE);

export const IMAGE_BASE_PATH = normalizeBasePath(rawBasePath);

function normalizeBasePath(base: string): string {
  if (!base) return '/';
  return base.endsWith('/') ? base : `${base}/`;
}

function stripBasePath(path: string): string {
  if (IMAGE_BASE_PATH === '/') return path;
  return path.startsWith(IMAGE_BASE_PATH) ? `/${path.slice(IMAGE_BASE_PATH.length)}` : path;
}

function hasUnsafePathSegment(path: string): boolean {
  return path.split('/').some((segment) => {
    try {
      return segment === '..' || decodeURIComponent(segment) === '..';
    } catch {
      return true;
    }
  });
}

export function getLocalImagePath(path: string): string | undefined {
  const localPath = stripBasePath(path);
  if (!localPath.startsWith(LOCAL_IMAGES_PREFIX)) return undefined;
  if (hasUnsafePathSegment(localPath)) return undefined;
  return localPath;
}

export function isLocalImagePath(path: string): boolean {
  return getLocalImagePath(path) !== undefined;
}

function getHttpsImageUrl(path: string): string | undefined {
  try {
    const url = new URL(path);
    return url.protocol === 'https:' ? url.href : undefined;
  } catch {
    return undefined;
  }
}

export function isAllowedImageSource(path: string): boolean {
  return Boolean(getLocalImagePath(path) ?? getHttpsImageUrl(path));
}

export function imagePath(path: string): string {
  if (!path) return path;

  const httpsUrl = getHttpsImageUrl(path);
  if (httpsUrl) return httpsUrl;

  const localPath = getLocalImagePath(path);
  if (!localPath) {
    throw new Error(`Unsafe or unsupported image source: ${path}`);
  }

  if (IMAGE_BASE_PATH !== '/' && path.startsWith(IMAGE_BASE_PATH)) return path;
  return `${IMAGE_BASE_PATH}${localPath.replace(/^\//, '')}`;
}
