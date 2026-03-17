import { graphql } from "@/graphql";
import type {
  FindAllEducationsQuery,
  FindAllEducationsQueryVariables,
} from "@/graphql/graphql";
import { execute } from "../factories/execute";
import { defineQuery } from "../factories/query";

const findAllEducations = graphql(`
  query findAllEducations {
    findAllEducations {
      category
      url
      status
      hours
      i18n {
        locale
        messages {
          description
          title
        }
      }
      id
      image
      organization {
        category
        id
        logo
        name
        slug
        website
      }
      period {
        from
        to
      }
      skills {
        category
        id
        name
        slug
      }
      slug
    }
  }
`);

export const {
  prefetch: prefetchFindAllEducations,
  use: useFindAllEducations,
} = defineQuery<FindAllEducationsQuery, FindAllEducationsQueryVariables>(
  "findAllEducations",
  async () => await execute(findAllEducations).then((data) => data.data!)
);
