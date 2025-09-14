import { dehydrate as primitiveDehydrate, type QueryClient } from "@tanstack/react-query";

export function dehydrate(queryClient: QueryClient) {
  // invalidate right after prefetching to ensure data is always fresh on the client side.
  queryClient.invalidateQueries();
  return primitiveDehydrate(queryClient);
}
