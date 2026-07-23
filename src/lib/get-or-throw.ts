import { isNil } from "lodash";

export function getOrThrow<T>(value: T | null | undefined, label: string): T {
  if (isNil(value) || value === "") {
    throw new Error(`Missing ${label}`);
  }

  return value;
}
