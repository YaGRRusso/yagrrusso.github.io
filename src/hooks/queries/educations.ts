import { graphql } from "@/graphql";
import type {
  FindManyEducationsQuery,
  FindManyEducationsQueryVariables,
} from "@/graphql/graphql";
import { execute } from "../factories/execute";
import { defineQuery } from "../factories/query";

const findManyEducations = graphql(`
  query FindManyEducations($educationFilters: FilterEducationInput) {
    findManyEducations(EducationFilters: $educationFilters) {
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
  prefetch: prefetchFindManyEducations,
  use: useFindManyEducations,
} = defineQuery<FindManyEducationsQuery, FindManyEducationsQueryVariables>(
  "findManyEducations",
  async (params: FindManyEducationsQueryVariables = {}) => {
    // if (!params) throw new Error("insufficient parameters");
    return await execute(findManyEducations, params).then((data) => data.data!);
  }
);
