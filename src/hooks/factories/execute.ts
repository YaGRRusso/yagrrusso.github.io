import type { ExecutionResult } from "graphql";
import type { TypedDocumentString } from "../../graphql/graphql";

export async function execute<TResult, TVariables>(
  query: TypedDocumentString<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
) {
  if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error("Missing NEXT_PUBLIC_API_URL environment variable");
  }

  const response = await fetch(process.env.NEXT_PUBLIC_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/graphql-response+json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
    body: JSON.stringify({
      query: query.toString(),
      variables,
    }),
  });

  if (!response.ok) {
    const error = new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
    throw error;
  }

  return response.json() as ExecutionResult<TResult>;
}
