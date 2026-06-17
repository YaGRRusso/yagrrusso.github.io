import { Inter, JetBrains_Mono, Source_Serif_4 } from "next/font/google";

/** Swap fonts here — no CSS changes needed. Applied on `<html>` via `fontVariables`. */
const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const fontVariables = [
  fontSans.variable,
  fontSerif.variable,
  fontMono.variable,
];
