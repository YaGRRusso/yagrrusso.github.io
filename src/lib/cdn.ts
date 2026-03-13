export function simpleIconsCdn(slug?: string | null) {
  if (!slug) return "";
  return `https://cdn.simpleicons.org/${slug}`;
}

export function googleFaviconCdn(domain?: string | null) {
  if (!domain) return "";
  return `https://s2.googleusercontent.com/s2/favicons?sz=64&domain=${domain}`;
}
