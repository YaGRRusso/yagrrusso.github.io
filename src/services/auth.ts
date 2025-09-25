import { graphql } from "../graphql";

export const GetMe = graphql(`
  query GetMe {
    getMe {
      id
      email
      name
      role
    }
  }
`);
