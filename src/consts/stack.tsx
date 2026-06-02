import {
  SiClaude,
  SiDocker,
  SiGooglegemini,
  SiGraphql,
  SiJavascript,
  SiJest,
  SiMongodb,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiServerless,
  SiTailwindcss,
  SiTanstack,
  SiTypescript,
} from "@icons-pack/react-simple-icons";
import type { ReactNode } from "react";

type StackType = {
  icon: ReactNode;
  name: string;
};

export const MAIN_STACK: StackType[] = [
  { name: "Typescript", icon: <SiTypescript color="default" /> },
  { name: "GraphQL", icon: <SiGraphql color="default" /> },
  { name: "React", icon: <SiReact color="default" /> },
  { name: "Javascript", icon: <SiJavascript color="default" /> },
  { name: "NestJS", icon: <SiNestjs color="default" /> },
  { name: "Node.js", icon: <SiNodedotjs color="default" /> },
];

export const SECONDARY_STACK: StackType[] = [
  { name: "Next.js", icon: <SiNextdotjs color="default" /> },
  { name: "Jest", icon: <SiJest color="default" /> },
  { name: "MongoDB", icon: <SiMongodb color="default" /> },
  { name: "Google Gemini", icon: <SiGooglegemini color="default" /> },
  { name: "TanStack", icon: <SiTanstack color="default" /> },
  { name: "Serverless", icon: <SiServerless color="default" /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss color="default" /> },
  { name: "Claude", icon: <SiClaude color="default" /> },
  { name: "Docker", icon: <SiDocker color="default" /> },
];
