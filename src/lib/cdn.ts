export function simpleIconsCdn(slug?: string | null, color?: string): string {
  if (!slug) return "";
  return `https://cdn.simpleicons.org/${slug}/${color ?? "_"}`;
}
