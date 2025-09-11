import type { ReactNode } from "react";
import { routing } from "@/i18n/routing";

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return <html lang={routing.defaultLocale}>{children}</html>;
}
