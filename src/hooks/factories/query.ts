import {
  type InfiniteData,
  infiniteQueryOptions,
  type QueryClient,
  queryOptions,
  type UndefinedInitialDataInfiniteOptions,
  type UndefinedInitialDataOptions,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";

export const defineQuery = <Data, Params = undefined>(
  queryKey: string,
  queryFn: (params: Params | undefined) => Promise<Data> | Data
) => {
  const key = (params?: Params) => [queryKey, params];

  const options = (params?: Params) =>
    queryOptions({
      queryFn: () => queryFn(params),
      queryKey: key(params),
    });

  const prefetch = (client: QueryClient, params?: Params) =>
    client.prefetchQuery(options(params));

  const use = (
    params?: Params,
    opts?: Omit<
      UndefinedInitialDataOptions<Data, Error, Data, ReturnType<typeof key>>,
      "queryKey" | "queryFn"
    >
  ) =>
    useQuery({
      ...options(params),
      ...opts,
    });

  return { key, options, prefetch, use };
};

export const defineInfiniteQuery = <
  Data,
  Params = undefined,
  PageParam = number,
>(
  queryKey: string,
  queryFn: (
    params: Params | undefined,
    pageParam: PageParam
  ) => Promise<Data> | Data,
  getPaginationOptions: (params?: Params) => {
    initialPageParam: PageParam;
    getNextPageParam: (
      lastPage: Data,
      allPages: Data[],
      lastPageParam: PageParam,
      allPageParams: PageParam[]
    ) => PageParam | undefined | null;
  }
) => {
  const key = (params?: Params) => [queryKey, params];

  const options = (params?: Params) =>
    infiniteQueryOptions({
      queryFn: ({ pageParam }) => queryFn(params, pageParam as PageParam),
      queryKey: key(params),
      ...getPaginationOptions(params),
    });

  const prefetch = (client: QueryClient, params?: Params) =>
    client.prefetchInfiniteQuery(options(params));

  const use = (
    params?: Params,
    opts?: Omit<
      UndefinedInitialDataInfiniteOptions<
        Data,
        Error,
        InfiniteData<Data>,
        ReturnType<typeof key>,
        PageParam
      >,
      "queryKey" | "queryFn" | "initialPageParam" | "getNextPageParam"
    >
  ) =>
    useInfiniteQuery({
      ...options(params),
      ...opts,
    } as any);

  return { key, options, prefetch, use };
};
