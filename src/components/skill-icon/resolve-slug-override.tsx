import {
  CloudIcon,
  DatabaseIcon,
  GraphIcon,
  ListMagnifyingGlassIcon,
  PawPrintIcon,
} from "@phosphor-icons/react";
import type { ReactNode } from "react";

const SIZE_CLASS = "size-[1em]";
const SLUG_OVERRIDES = {
  aws: <CloudIcon className={SIZE_CLASS} />,
  codegen: <GraphIcon className={SIZE_CLASS} />,
  nuqs: <ListMagnifyingGlassIcon className={SIZE_CLASS} />,
  typesense: <DatabaseIcon className={SIZE_CLASS} />,
  zustand: <PawPrintIcon className={SIZE_CLASS} />,
} as const satisfies Record<string, ReactNode>;

export function resolveSlugOverride(slug: string): ReactNode | null {
  if (!(slug in SLUG_OVERRIDES)) {
    return null;
  }

  return SLUG_OVERRIDES[slug as keyof typeof SLUG_OVERRIDES];
}
