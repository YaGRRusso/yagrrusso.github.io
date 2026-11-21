import type { ExecutionResult } from "graphql";
import { env } from "@/lib/env";
import type { TypedDocumentString } from "../../graphql/graphql";

export async function execute<TResult, TVariables>(
  query: TypedDocumentString<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
) {
  const response = await fetch(env.NEXT_PUBLIC_API_URL, {
    body: JSON.stringify({
      query: query.toString(),
      variables,
    }),
    headers: {
      Accept: "application/graphql-response+json",
      "Content-Type": "application/json",
      "X-Api-Key": env.NEXT_PUBLIC_API_KEY,
    },
    method: "POST",
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch: ${response.status} ${response.statusText}`
    );
  }

  return response.json() as ExecutionResult<TResult>;
}
