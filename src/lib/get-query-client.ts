import { QueryClient } from "@tanstack/react-query";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      mutations: {
        retry: 5,
        retryDelay: 30_000, // 30 seconds
      },
      queries: {
        refetchOnWindowFocus: false,
        retry: 5,
        retryDelay: 30_000, // 30 seconds
        staleTime: 600_000, // 10 minutes
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

export function getQueryClient() {
  if (typeof window === "undefined") {
    return makeQueryClient();
  }

  browserQueryClient ??= makeQueryClient();
  return browserQueryClient;
}
