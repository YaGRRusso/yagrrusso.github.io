export function getOrThrow<T>(value: T | null | undefined, label: string): T {
  if (value == null || value === "") {
    throw new Error(`Missing ${label}`);
  }

  return value;
}
