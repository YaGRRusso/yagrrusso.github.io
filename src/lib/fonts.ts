import { JetBrains_Mono, Space_Grotesk } from "next/font/google";

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const fontVariables = [jetbrainsMono.variable, spaceGrotesk.variable];
