import {
  BrainIcon,
  CloudIcon,
  CodeIcon,
  DatabaseIcon,
  DesktopIcon,
  PackageIcon,
  RocketIcon,
  StackIcon,
  StarIcon,
  TestTubeIcon,
  WrenchIcon,
} from "@phosphor-icons/react";
import type { ReactNode } from "react";

export const Categories: Record<
  string,
  { value: string; key: string; icon: ReactNode }
> = {
  all: {
    value: "all",
    key: "categories.all",
    icon: <PackageIcon />,
  },
  soft: {
    value: "soft",
    key: "categories.soft",
    icon: <BrainIcon />,
  },
  language: {
    value: "language",
    key: "categories.language",
    icon: <CodeIcon />,
  },
  framework: {
    value: "framework",
    key: "categories.framework",
    icon: <StackIcon />,
  },
  database: {
    value: "database",
    key: "categories.database",
    icon: <DatabaseIcon />,
  },
  tool: {
    value: "tool",
    key: "categories.tool",
    icon: <WrenchIcon />,
  },
  system: {
    value: "system",
    key: "categories.system",
    icon: <DesktopIcon />,
  },
  testing: {
    value: "testing",
    key: "categories.testing",
    icon: <TestTubeIcon />,
  },
  pattern: {
    value: "pattern",
    key: "categories.pattern",
    icon: <RocketIcon />,
  },
  devops: {
    value: "devops",
    key: "categories.devops",
    icon: <CloudIcon />,
  },
  other: {
    value: "other",
    key: "categories.other",
    icon: <StarIcon />,
  },
};
