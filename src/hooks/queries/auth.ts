import type { GetMeQuery, GetMeQueryVariables } from "@/graphql/graphql";
import { GetMe } from "@/services/auth";
import { execute } from "../factories/execute";
import { defineQuery } from "../factories/query";

export const { prefetch: prefetchGetMe, use: useGetMe } = defineQuery<GetMeQuery, GetMeQueryVariables>("getMe", () =>
  execute(GetMe).then((data) => data.data!)
);
