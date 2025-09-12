import type { Metadata } from "next";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  icons: [
    {
      rel: "icon",
      url: "/favicon-black.svg",
      media: "(prefers-color-scheme: light)",
    },
    {
      rel: "icon",
      url: "/favicon-white.svg",
      media: "(prefers-color-scheme: dark)",
    },
  ],
};

export default function RootLayout({ children }: Props) {
  return children;
}
