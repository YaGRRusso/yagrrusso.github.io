import { type UndefinedInitialDataOptions, useQuery } from "@tanstack/react-query";
import { getRepos, type Repo, type SearchParams } from "@/services/repos";

type QueryOptions<T> = Omit<UndefinedInitialDataOptions<T>, "queryKey" | "queryFn">;

export const useGetRepos = (data?: SearchParams, options?: QueryOptions<Repo[]>) => {
  return useQuery({
    queryKey: ["getRepos", data],
    queryFn: () => getRepos(data),
    ...options,
  });
};
