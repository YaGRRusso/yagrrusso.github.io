import { graphql } from "@/graphql/gql";
import type { FindOneUserByIdQuery, FindOneUserByIdQueryVariables } from "@/graphql/graphql";
import { execute } from "../factories/execute";
import { defineQuery } from "../factories/query";

const findOneUserById = graphql(`
  query findOneUserById($findOneUserByIdId: ID!) {
    findOneUserById(id: $findOneUserByIdId) {
      address
      avatar
      birthDate
      description
      email
      hobbies
      id
      name
      nickname
      phone
      postalCode
      role
      school
      title
      work
      urls {
        code
        value
      }
    }
  }
`);

export const { prefetch: prefetchFindOneUserById, use: useFindOneUserById } = defineQuery<
  FindOneUserByIdQuery,
  FindOneUserByIdQueryVariables
>("findOneUserById", async (params?: FindOneUserByIdQueryVariables) => {
  if (!params) throw new Error("insufficient parameters");
  return await execute(findOneUserById, params).then((data) => data.data!);
});
