import { defineRouting } from "next-intl/routing";
import messages from "../../messages/en.json" with { type: "json" };

export const routing = defineRouting({
  locales: ["en", "pt"],
  defaultLocale: "en",
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
    value: "en",
    name: "English",
    flag: "🇺🇸",
  },
  {
    value: "pt",
    name: "Português",
    flag: "🇧🇷",
  },
];
