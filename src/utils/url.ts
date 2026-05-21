export const SITE_URL = 'https://sujittra-see.github.io';

const FIGMA_HOSTS = new Set(['figma.com', 'www.figma.com']);
const FIGMA_EMBED_HOST = 'embed.figma.com';

function parseUrl(value: string): URL | undefined {
  try {
    return new URL(value);
  } catch {
    return undefined;
  }
}

export function isSafeHttpsUrl(value: string): boolean {
  const url = parseUrl(value);
  return Boolean(url && url.protocol === 'https:');
}

export function sanitizeHttpsUrl(value: string | undefined): string | undefined {
  if (!value || !isSafeHttpsUrl(value)) return undefined;
  return new URL(value).href;
}

export function isFigmaUrl(value: string): boolean {
  const url = parseUrl(value);
  return Boolean(url && url.protocol === 'https:' && FIGMA_HOSTS.has(url.hostname));
}

export function isSafeFigmaEmbedUrl(value: string): boolean {
  const url = parseUrl(value);
  if (!url || url.protocol !== 'https:') {
    return false;
  }

  if (url.hostname === FIGMA_EMBED_HOST && url.pathname.startsWith('/proto/')) return true;

  if (url.hostname !== 'www.figma.com' || url.pathname !== '/embed') return false;

  const embeddedUrl = url.searchParams.get('url');
  return Boolean(embeddedUrl && isFigmaUrl(embeddedUrl));
}

export function getFigmaOpenUrl(embedUrl: string): string | undefined {
  if (!isSafeFigmaEmbedUrl(embedUrl)) return undefined;

  const url = new URL(embedUrl);
  if (url.hostname === FIGMA_EMBED_HOST) {
    url.hostname = 'www.figma.com';
    return url.href;
  }

  const embeddedUrl = url.searchParams.get('url');
  if (!embeddedUrl || !isFigmaUrl(embeddedUrl)) return undefined;

  return new URL(embeddedUrl).href;
}
