type StackType = {
  name: string;
  slug: string;
};

export const MAIN_STACK = [
  { name: "Typescript", slug: "typescript" },
  { name: "GraphQL", slug: "graphql" },
  { name: "React", slug: "react" },
  { name: "Javascript", slug: "javascript" },
  { name: "NestJS", slug: "nestjs" },
  { name: "Node.js", slug: "nodedotjs" },
] as const satisfies StackType[];

export const SECONDARY_STACK = [
  { name: "Next.js", slug: "nextdotjs" },
  { name: "Jest", slug: "jest" },
  { name: "MongoDB", slug: "mongodb" },
  { name: "Google Gemini", slug: "googlegemini" },
  { name: "TanStack", slug: "tanstack" },
  { name: "Serverless", slug: "serverless" },
  { name: "Tailwind CSS", slug: "tailwindcss" },
  { name: "Claude", slug: "claude" },
  { name: "Docker", slug: "docker" },
] as const satisfies StackType[];
