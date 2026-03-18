import { graphql } from "@/graphql";
import type {
  FindManyOrganizationsQuery,
  FindManyOrganizationsQueryVariables,
} from "@/graphql/graphql";
import { execute } from "../factories/execute";
import { defineQuery } from "../factories/query";

const findManyOrganizations = graphql(`
  query FindManyOrganizations($organizationFilters: FilterOrganizationInput) {
    findManyOrganizations(OrganizationFilters: $organizationFilters) {
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
  prefetch: prefetchFindManyOrganizations,
  use: useFindManyOrganizations,
} = defineQuery<
  FindManyOrganizationsQuery,
  FindManyOrganizationsQueryVariables
>(
  "findManyOrganizations",
  async (params: FindManyOrganizationsQueryVariables = {}) => {
    // if (!params) throw new Error("insufficient parameters");
    return await execute(findManyOrganizations, params).then(
      (data) => data.data!
    );
  }
);
