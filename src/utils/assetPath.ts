export function getAssetPath(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return `${basePath}/${cleanPath}`;
} 