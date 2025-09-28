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

export const Categories = [
  {
    label: "All",
    value: "ALL",
    icon: <PackageIcon />,
  },
  {
    label: "Soft",
    value: "SOFT",
    icon: <BrainIcon />,
  },
  {
    label: "Languages",
    value: "LANGUAGE",
    icon: <CodeIcon />,
  },
  {
    label: "Frameworks",
    value: "FRAMEWORK",
    icon: <StackIcon />,
  },
  {
    label: "Databases",
    value: "DATABASE",
    icon: <DatabaseIcon />,
  },
  {
    label: "Tools",
    value: "TOOL",
    icon: <WrenchIcon />,
  },
  {
    label: "Systems",
    value: "SYSTEM",
    icon: <DesktopIcon />,
  },
  {
    label: "Testing",
    value: "TESTING",
    icon: <TestTubeIcon />,
  },
  {
    label: "Patterns",
    value: "PATTERN",
    icon: <RocketIcon />,
  },
  {
    label: "DevOps",
    value: "DEVOPS",
    icon: <CloudIcon />,
  },
  {
    label: "Other",
    value: "OTHER",
    icon: <StarIcon />,
  },
];
