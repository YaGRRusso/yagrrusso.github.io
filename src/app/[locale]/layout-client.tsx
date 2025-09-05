"use client";

import { redirect, usePathname } from "@/i18n/navigation";

type Props = {
  locale: string;
};

export function ClientRootLayout({ locale }: Props) {
  const pathname = usePathname();

  return (
    <header>
      <button onClick={() => console.log(locale, pathname)} type="button">
        Current
      </button>
      <button onClick={() => redirect({ href: pathname, locale: "en" })} type="button">
        English
      </button>
      <button onClick={() => redirect({ href: pathname, locale: "pt" })} type="button">
        Português
      </button>
    </header>
  );
}
