import type { CodegenConfig } from "@graphql-codegen/cli";
import { config as dotenv } from "dotenv";
import { getOrThrow } from "./src/lib/get-or-throw";

dotenv({ path: ".env.development" });

const apiUrl = getOrThrow(
  process.env.NEXT_PUBLIC_API_URL,
  "NEXT_PUBLIC_API_URL environment variable"
);
const apiKey = getOrThrow(
  process.env.NEXT_PUBLIC_API_KEY,
  "NEXT_PUBLIC_API_KEY environment variable"
);

const config: CodegenConfig = {
  schema: {
    [apiUrl]: {
      headers: {
        "X-Api-Key": apiKey,
      },
    },
  },
  documents: ["src/hooks/queries/*.ts", "src/hooks/mutations/*.ts"],
  ignoreNoDocuments: true,
  generates: {
    "./src/graphql/": {
      preset: "client",
      config: {
        documentMode: "string",
      },
    },
    "./schema.graphql": {
      plugins: ["schema-ast"],
      config: {
        includeDirectives: true,
      },
    },
  },
};

export default config;
