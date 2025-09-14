import { type QueryClient, queryOptions, type UndefinedInitialDataOptions, useQuery } from "@tanstack/react-query";

export const defineQuery = <Data, Params = undefined>(
  queryKey: string,
  queryFn: (params: Params | undefined) => Promise<Data> | Data
) => {
  const key = (params?: Params) => [queryKey, params];

  const options = (params?: Params) =>
    queryOptions({
      queryKey: key(params),
      queryFn: () => queryFn(params),
    });

  const prefetch = (client: QueryClient, params?: Params) => client.prefetchQuery(options(params));

  const use = (
    params?: Params,
    opts?: Omit<UndefinedInitialDataOptions<Data, Error, Data, ReturnType<typeof key>>, "queryKey" | "queryFn">
  ) =>
    useQuery({
      ...options(params),
      ...opts,
    });

  return { key, options, prefetch, use };
};
