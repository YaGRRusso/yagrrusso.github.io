import { type UndefinedInitialDataOptions, useQuery } from "@tanstack/react-query";
import { type GetReposParams, getRepos, type Repo } from "@/services/repos";

type QueryOptions<T> = Omit<UndefinedInitialDataOptions<T>, "queryKey" | "queryFn">;

export const useGetRepos = (data?: GetReposParams, options?: QueryOptions<Repo[]>) => {
  return useQuery({
    queryKey: ["getRepos", data],
    queryFn: () => getRepos(data),
    ...options,
  });
};
