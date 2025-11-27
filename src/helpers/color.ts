function getColorLuminance(color: string): number {
  const hex = color.replace("#", "");
  const r = Number.parseInt(hex.substring(0, 2), 16);
  const g = Number.parseInt(hex.substring(2, 4), 16);
  const b = Number.parseInt(hex.substring(4, 6), 16);

  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

export function isDarkColor(color?: string | null): boolean {
  if (!color) return false;
  return getColorLuminance(color) < 0.2;
}

export function isLightColor(color?: string | null): boolean {
  if (!color) return false;
  return getColorLuminance(color) > 0.2;
}
