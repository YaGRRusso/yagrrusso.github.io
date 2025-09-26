/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query findOneUserById($findOneUserByIdId: ID!) {\n    findOneUserById(id: $findOneUserByIdId) {\n      address\n      avatar\n      birthDate\n      description\n      email\n      hobbies\n      id\n      name\n      nickname\n      phone\n      postalCode\n      role\n      school\n      title\n      work\n      urls {\n        code\n        value\n      }\n    }\n  }\n": typeof types.FindOneUserByIdDocument,
    "\n  query findAllSkills {\n    findAllSkills {\n      id\n      name\n      category\n      slug\n      color\n    }\n  }\n": typeof types.FindAllSkillsDocument,
};
const documents: Documents = {
    "\n  query findOneUserById($findOneUserByIdId: ID!) {\n    findOneUserById(id: $findOneUserByIdId) {\n      address\n      avatar\n      birthDate\n      description\n      email\n      hobbies\n      id\n      name\n      nickname\n      phone\n      postalCode\n      role\n      school\n      title\n      work\n      urls {\n        code\n        value\n      }\n    }\n  }\n": types.FindOneUserByIdDocument,
    "\n  query findAllSkills {\n    findAllSkills {\n      id\n      name\n      category\n      slug\n      color\n    }\n  }\n": types.FindAllSkillsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query findOneUserById($findOneUserByIdId: ID!) {\n    findOneUserById(id: $findOneUserByIdId) {\n      address\n      avatar\n      birthDate\n      description\n      email\n      hobbies\n      id\n      name\n      nickname\n      phone\n      postalCode\n      role\n      school\n      title\n      work\n      urls {\n        code\n        value\n      }\n    }\n  }\n"): typeof import('./graphql').FindOneUserByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query findAllSkills {\n    findAllSkills {\n      id\n      name\n      category\n      slug\n      color\n    }\n  }\n"): typeof import('./graphql').FindAllSkillsDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
