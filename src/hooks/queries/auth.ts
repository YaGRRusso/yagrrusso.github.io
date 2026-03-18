import { graphql } from "@/graphql/gql";
import type {
  FindOneUserByIdQuery,
  FindOneUserByIdQueryVariables,
} from "@/graphql/graphql";
import { execute } from "../factories/execute";
import { defineQuery } from "../factories/query";

const findOneUserById = graphql(`
  query FindOneUserById($userId: ID!) {
    findOneUserById(UserId: $userId) {
      id
      address
      title
      urls {
        title
        value
      }
      avatar
      birth
      email
      name
      nickname
      phone
      role
    }
  }
`);

export const { prefetch: prefetchFindOneUserById, use: useFindOneUserById } =
  defineQuery<FindOneUserByIdQuery, FindOneUserByIdQueryVariables>(
    "findOneUserById",
    async (params?: FindOneUserByIdQueryVariables) => {
      if (!params) throw new Error("insufficient parameters");
      return await execute(findOneUserById, params).then((data) => data.data!);
    }
  );
