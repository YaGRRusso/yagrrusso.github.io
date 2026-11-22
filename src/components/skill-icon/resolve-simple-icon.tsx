"use client";

import Image from "next/image";
import { type ReactNode, useState } from "react";
import { simpleIconsCdn } from "@/lib/cdn";
import { FALLBACK_ICON } from "./fallback-icon";

const SIZE_CLASS = "size-[1em]";

function SimpleIcon({ slug }: { slug: string }): ReactNode {
  const [hasFailed, setHasFailed] = useState(false);

  if (hasFailed) {
    return FALLBACK_ICON;
  }

  return (
    <Image
      alt={slug}
      className={SIZE_CLASS}
      height={24}
      onError={() => setHasFailed(true)}
      src={simpleIconsCdn(slug)}
      width={24}
    />
  );
}

export function resolveSimpleIcon(slug: string): ReactNode {
  return <SimpleIcon slug={slug} />;
}
