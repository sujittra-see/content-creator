const BASE = import.meta.env.BASE_URL;

export function imagePath(path: string): string {
  if (!path) return path;
  if (path.startsWith('http') || path.startsWith('data:')) return path;
  
  // Guard against duplicate prefixing if path already includes the BASE
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  if (normalizedPath.startsWith(BASE)) {
    return normalizedPath;
  }
  
  return `${BASE}${path.replace(/^\//, '')}`;
}
