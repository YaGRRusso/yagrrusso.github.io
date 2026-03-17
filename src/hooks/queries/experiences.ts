import { graphql } from "@/graphql";
import type {
  FindAllExperiencesQuery,
  FindAllExperiencesQueryVariables,
} from "@/graphql/graphql";
import { execute } from "../factories/execute";
import { defineQuery } from "../factories/query";

const findAllExperiences = graphql(`
  query findAllExperiences {
    findAllExperiences {
      category
      id
      organization {
        category
        id
        logo
        name
        slug
        website
      }
      roles {
        i18n {
          locale
          messages {
            description
            title
          }
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
  prefetch: prefetchFindAllExperiences,
  use: useFindAllExperiences,
} = defineQuery<FindAllExperiencesQuery, FindAllExperiencesQueryVariables>(
  "findAllExperiences",
  async () => await execute(findAllExperiences).then((data) => data.data!)
);
