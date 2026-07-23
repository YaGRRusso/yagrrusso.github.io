import type { ExecutionResult } from "graphql";
import { getOrThrow } from "@/lib/get-or-throw";
import type { TypedDocumentString } from "../../graphql/graphql";

export async function execute<TResult, TVariables>(
  query: TypedDocumentString<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
) {
  const apiUrl = getOrThrow(
    process.env.NEXT_PUBLIC_API_URL,
    "NEXT_PUBLIC_API_URL environment variable"
  );
  const apiKey = getOrThrow(
    process.env.NEXT_PUBLIC_API_KEY,
    "NEXT_PUBLIC_API_KEY environment variable"
  );

  const response = await fetch(apiUrl, {
    body: JSON.stringify({
      query: query.toString(),
      variables,
    }),
    headers: {
      Accept: "application/graphql-response+json",
      "Content-Type": "application/json",
      "X-Api-Key": apiKey,
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
