import { defineRouting } from "next-intl/routing";
import messages from "../../messages/en.json" with { type: "json" };

export const routing = defineRouting({
  defaultLocale: "en",
  locales: ["en", "pt"],
});

export type Locale = (typeof routing.locales)[number];
export type Messages = typeof messages;
export type Namespace = {
  [K in keyof Messages]: Messages[K] extends {
    title: string;
    description: string;
  }
    ? K
    : never;
}[keyof Messages];

export const locales: {
  value: Locale;
  name: string;
  flag: string;
}[] = [
  {
    flag: "🇺🇸",
    name: "English",
    value: "en",
  },
  {
    flag: "🇧🇷",
    name: "Português",
    value: "pt",
  },
];
