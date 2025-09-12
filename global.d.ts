import type { Messages } from "@/i18n/routing";

declare module "next-intl" {
  interface AppConfig {
    Messages: Messages;
  }
}
