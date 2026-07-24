import { graphql } from "@/graphql/gql";
import type { GetMeQuery } from "@/graphql/graphql";
import { execute } from "../factories/execute";
import { defineQuery } from "../factories/query";

const getMe = graphql(`
  query GetMe {
    getMe {
      name
      avatar
      i18n {
        locale
        messages {
          title
          description
        }
      }
      skills {
        id
        slug
        i18n {
          locale
          messages {
            title
          }
        }
      }
    }
  }
`);

export const { prefetch: prefetchGetMe, use: useGetMe } =
  defineQuery<GetMeQuery>(
    "getMe",
    async () => await execute(getMe).then((data) => data.data!)
  );
