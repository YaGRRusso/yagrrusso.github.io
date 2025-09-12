import type { formats } from "@/i18n/request";
import type { Locale } from "@/i18n/routing";
import messages from "./messages/en.json" with { type: "json" };

declare module "next-intl" {
  interface AppConfig {
    Locale: Locale;
    Messages: typeof messages;
    Formats: typeof formats;
  }
}
