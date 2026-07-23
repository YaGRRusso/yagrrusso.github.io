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
  documents: ["src/hooks/queries/*.ts", "src/hooks/mutations/*.ts"],
  generates: {
    "./schema.graphql": {
      config: {
        includeDirectives: true,
      },
      plugins: ["schema-ast"],
    },
    "./src/graphql/": {
      config: {
        documentMode: "string",
      },
      preset: "client",
    },
  },
  ignoreNoDocuments: true,
  schema: {
    [apiUrl]: {
      headers: {
        "X-Api-Key": apiKey,
      },
    },
  },
};

export default config;
