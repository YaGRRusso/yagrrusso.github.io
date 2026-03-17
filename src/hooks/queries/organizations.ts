import { graphql } from "@/graphql";
import type {
  FindAllOrganizationsQuery,
  FindAllOrganizationsQueryVariables,
} from "@/graphql/graphql";
import { execute } from "../factories/execute";
import { defineQuery } from "../factories/query";

const findAllOrganizations = graphql(`
  query findAllOrganizations {
    findAllOrganizations {
      category
      id
      logo
      name
      slug
      website
    }
  }
`);

export const {
  prefetch: prefetchFindAllOrganizations,
  use: useFindAllOrganizations,
} = defineQuery<FindAllOrganizationsQuery, FindAllOrganizationsQueryVariables>(
  "findAllOrganizations",
  async () => await execute(findAllOrganizations).then((data) => data.data!)
);
