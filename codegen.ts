import type { CodegenConfig } from "@graphql-codegen/cli";
import { config as dotenv } from "dotenv";

dotenv({ path: ".env.development" });

const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_API_URL,
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
