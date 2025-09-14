import { type GetReposParams, type GetReposResponse, getRepos } from "@/services/repos";
import { defineQuery } from "../factories/query";

export const { prefetch: prefetchGetRepos, use: useGetRepos } = defineQuery<GetReposResponse, GetReposParams>(
  "getRepos",
  getRepos
);
