import type { ExecutionResult } from 'graphql'
import type { TypedDocumentString } from './graphql'
 
export async function execute<TResult, TVariables>(
  query: TypedDocumentString<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
) {
  const response = await fetch('http://localhost:3000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/graphql-response+json',
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2OGQ1NTcwODJkZTcwNjdhMTkwYzljMmEiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc1ODgxMzcxNywiZXhwIjoxNzU4ODE0MzE3fQ.lXgsIf2nyx6Wufk7Kx11Hi0zSEhlGnEXUiiufjtBS6I"
    },
    body: JSON.stringify({
      query: query.toString(),
      variables,
    }),
  })
 
  if (!response.ok) {
    const error = new Error(
      `Failed to fetch: ${response.status} ${response.statusText}`,
    )
    throw error
  }
 
  return response.json() as ExecutionResult<TResult>
}