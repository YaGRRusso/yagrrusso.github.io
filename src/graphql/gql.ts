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
    "\n  query findOneUserById($findOneUserByIdId: ID!) {\n    findOneUserById(id: $findOneUserByIdId) {\n      id\n      address\n      title\n      urls {\n        title\n        value\n      }\n      avatar\n      birth\n      email\n      name\n      nickname\n      phone\n      role\n    }\n  }\n": typeof types.FindOneUserByIdDocument,
    "\n  query findAllEducations {\n    findAllEducations {\n      category\n      url\n      status\n      hours\n      i18n {\n        locale\n        messages {\n          description\n          title\n        }\n      }\n      id\n      image\n      organization {\n        category\n        id\n        logo\n        name\n        slug\n        website\n      }\n      period {\n        from\n        to\n      }\n      skills {\n        category\n        id\n        name\n        slug\n      }\n      slug\n    }\n  }\n": typeof types.FindAllEducationsDocument,
    "\n  query findAllExperiences {\n    findAllExperiences {\n      category\n      id\n      organization {\n        category\n        id\n        logo\n        name\n        slug\n        website\n      }\n      roles {\n        i18n {\n          locale\n          messages {\n            description\n            title\n          }\n        }\n        period {\n          from\n          to\n        }\n        skills {\n          category\n          id\n          name\n          slug\n        }\n      }\n      skills {\n        category\n        id\n        name\n        slug\n      }\n      slug\n    }\n  }\n": typeof types.FindAllExperiencesDocument,
    "\n  query findAllOrganizations {\n    findAllOrganizations {\n      category\n      id\n      logo\n      name\n      slug\n      website\n    }\n  }\n": typeof types.FindAllOrganizationsDocument,
    "\n  query findAllProjects {\n    findAllProjects {\n      id\n      i18n {\n        locale\n        messages {\n          description\n          title\n        }\n      }\n      images\n      skills {\n        category\n        id\n        name\n        slug\n      }\n      slug\n      urls {\n        title\n        value\n      }\n    }\n  }\n": typeof types.FindAllProjectsDocument,
    "\n  query findAllSkills {\n    findAllSkills {\n      category\n      id\n      name\n      slug\n    }\n  }\n": typeof types.FindAllSkillsDocument,
};
const documents: Documents = {
    "\n  query findOneUserById($findOneUserByIdId: ID!) {\n    findOneUserById(id: $findOneUserByIdId) {\n      id\n      address\n      title\n      urls {\n        title\n        value\n      }\n      avatar\n      birth\n      email\n      name\n      nickname\n      phone\n      role\n    }\n  }\n": types.FindOneUserByIdDocument,
    "\n  query findAllEducations {\n    findAllEducations {\n      category\n      url\n      status\n      hours\n      i18n {\n        locale\n        messages {\n          description\n          title\n        }\n      }\n      id\n      image\n      organization {\n        category\n        id\n        logo\n        name\n        slug\n        website\n      }\n      period {\n        from\n        to\n      }\n      skills {\n        category\n        id\n        name\n        slug\n      }\n      slug\n    }\n  }\n": types.FindAllEducationsDocument,
    "\n  query findAllExperiences {\n    findAllExperiences {\n      category\n      id\n      organization {\n        category\n        id\n        logo\n        name\n        slug\n        website\n      }\n      roles {\n        i18n {\n          locale\n          messages {\n            description\n            title\n          }\n        }\n        period {\n          from\n          to\n        }\n        skills {\n          category\n          id\n          name\n          slug\n        }\n      }\n      skills {\n        category\n        id\n        name\n        slug\n      }\n      slug\n    }\n  }\n": types.FindAllExperiencesDocument,
    "\n  query findAllOrganizations {\n    findAllOrganizations {\n      category\n      id\n      logo\n      name\n      slug\n      website\n    }\n  }\n": types.FindAllOrganizationsDocument,
    "\n  query findAllProjects {\n    findAllProjects {\n      id\n      i18n {\n        locale\n        messages {\n          description\n          title\n        }\n      }\n      images\n      skills {\n        category\n        id\n        name\n        slug\n      }\n      slug\n      urls {\n        title\n        value\n      }\n    }\n  }\n": types.FindAllProjectsDocument,
    "\n  query findAllSkills {\n    findAllSkills {\n      category\n      id\n      name\n      slug\n    }\n  }\n": types.FindAllSkillsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query findOneUserById($findOneUserByIdId: ID!) {\n    findOneUserById(id: $findOneUserByIdId) {\n      id\n      address\n      title\n      urls {\n        title\n        value\n      }\n      avatar\n      birth\n      email\n      name\n      nickname\n      phone\n      role\n    }\n  }\n"): typeof import('./graphql').FindOneUserByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query findAllEducations {\n    findAllEducations {\n      category\n      url\n      status\n      hours\n      i18n {\n        locale\n        messages {\n          description\n          title\n        }\n      }\n      id\n      image\n      organization {\n        category\n        id\n        logo\n        name\n        slug\n        website\n      }\n      period {\n        from\n        to\n      }\n      skills {\n        category\n        id\n        name\n        slug\n      }\n      slug\n    }\n  }\n"): typeof import('./graphql').FindAllEducationsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query findAllExperiences {\n    findAllExperiences {\n      category\n      id\n      organization {\n        category\n        id\n        logo\n        name\n        slug\n        website\n      }\n      roles {\n        i18n {\n          locale\n          messages {\n            description\n            title\n          }\n        }\n        period {\n          from\n          to\n        }\n        skills {\n          category\n          id\n          name\n          slug\n        }\n      }\n      skills {\n        category\n        id\n        name\n        slug\n      }\n      slug\n    }\n  }\n"): typeof import('./graphql').FindAllExperiencesDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query findAllOrganizations {\n    findAllOrganizations {\n      category\n      id\n      logo\n      name\n      slug\n      website\n    }\n  }\n"): typeof import('./graphql').FindAllOrganizationsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query findAllProjects {\n    findAllProjects {\n      id\n      i18n {\n        locale\n        messages {\n          description\n          title\n        }\n      }\n      images\n      skills {\n        category\n        id\n        name\n        slug\n      }\n      slug\n      urls {\n        title\n        value\n      }\n    }\n  }\n"): typeof import('./graphql').FindAllProjectsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query findAllSkills {\n    findAllSkills {\n      category\n      id\n      name\n      slug\n    }\n  }\n"): typeof import('./graphql').FindAllSkillsDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
