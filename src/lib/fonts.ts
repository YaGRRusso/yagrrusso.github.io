import { JetBrains_Mono, Merriweather, Space_Grotesk } from "next/font/google";

const fontSans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-family-sans",
});

const fontSerif = Merriweather({
  subsets: ["latin"],
  variable: "--font-family-serif",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-family-mono",
});

export const fontVariables = [
  fontSans.variable,
  fontSerif.variable,
  fontMono.variable,
];
