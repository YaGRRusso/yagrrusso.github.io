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
    "\n  query FindOneUserById($userId: ID!) {\n    findOneUserById(UserId: $userId) {\n      id\n      address\n      title\n      urls {\n        title\n        value\n      }\n      avatar\n      birth\n      email\n      name\n      nickname\n      phone\n      role\n    }\n  }\n": typeof types.FindOneUserByIdDocument,
    "\n  query FindManyEducations($educationFilters: FilterEducationInput, $educationPagination: PaginationInput, $educationSort: SortEducationInput) {\n    findManyEducations(EducationFilters: $educationFilters, EducationPagination: $educationPagination, EducationSort: $educationSort) {\n      category\n      url\n      status\n      hours\n      i18n {\n        locale\n        messages {\n          description\n          title\n        }\n      }\n      id\n      image\n      organization {\n        category\n        id\n        logo\n        name\n        slug\n        website\n      }\n      period {\n        from\n        to\n      }\n      skills {\n        category\n        id\n        name\n        slug\n      }\n      slug\n    }\n  }\n": typeof types.FindManyEducationsDocument,
    "\n  query FindManyExperiences($experienceFilters: FilterExperienceInput, $experiencePagination: PaginationInput, $experienceSort: SortExperienceInput) {\n    findManyExperiences(ExperienceFilters: $experienceFilters, ExperiencePagination: $experiencePagination, ExperienceSort: $experienceSort) {\n      category\n      id\n      organization {\n        category\n        id\n        logo\n        name\n        slug\n        website\n      }\n      roles {\n        i18n {\n          locale\n          messages {\n            description\n            title\n          }\n        }\n        period {\n          from\n          to\n        }\n        skills {\n          category\n          id\n          name\n          slug\n        }\n      }\n      skills {\n        category\n        id\n        name\n        slug\n      }\n      slug\n    }\n  }\n": typeof types.FindManyExperiencesDocument,
    "\n  query FindManyOrganizations($organizationFilters: FilterOrganizationInput, $organizationPagination: PaginationInput, $organizationSort: SortOrganizationInput) {\n    findManyOrganizations(OrganizationFilters: $organizationFilters, OrganizationPagination: $organizationPagination, OrganizationSort: $organizationSort) {\n      category\n      id\n      logo\n      name\n      slug\n      website\n    }\n  }\n": typeof types.FindManyOrganizationsDocument,
    "\n  query FindManyProjects($projectFilters: FilterProjectInput, $projectPagination: PaginationInput, $projectSort: SortProjectInput) {\n    findManyProjects(ProjectFilters: $projectFilters, ProjectPagination: $projectPagination, ProjectSort: $projectSort) {\n      id\n      i18n {\n        locale\n        messages {\n          description\n          title\n        }\n      }\n      images\n      skills {\n        category\n        id\n        name\n        slug\n      }\n      slug\n      urls {\n        title\n        value\n      }\n    }\n  }\n": typeof types.FindManyProjectsDocument,
    "\n  query FindManySkills($skillFilters: FilterSkillInput, $skillPagination: PaginationInput, $skillSort: SortSkillInput) {\n    findManySkills(SkillFilters: $skillFilters, SkillPagination: $skillPagination, SkillSort: $skillSort) {\n      category\n      id\n      name\n      slug\n    }\n  }\n": typeof types.FindManySkillsDocument,
};
const documents: Documents = {
    "\n  query FindOneUserById($userId: ID!) {\n    findOneUserById(UserId: $userId) {\n      id\n      address\n      title\n      urls {\n        title\n        value\n      }\n      avatar\n      birth\n      email\n      name\n      nickname\n      phone\n      role\n    }\n  }\n": types.FindOneUserByIdDocument,
    "\n  query FindManyEducations($educationFilters: FilterEducationInput, $educationPagination: PaginationInput, $educationSort: SortEducationInput) {\n    findManyEducations(EducationFilters: $educationFilters, EducationPagination: $educationPagination, EducationSort: $educationSort) {\n      category\n      url\n      status\n      hours\n      i18n {\n        locale\n        messages {\n          description\n          title\n        }\n      }\n      id\n      image\n      organization {\n        category\n        id\n        logo\n        name\n        slug\n        website\n      }\n      period {\n        from\n        to\n      }\n      skills {\n        category\n        id\n        name\n        slug\n      }\n      slug\n    }\n  }\n": types.FindManyEducationsDocument,
    "\n  query FindManyExperiences($experienceFilters: FilterExperienceInput, $experiencePagination: PaginationInput, $experienceSort: SortExperienceInput) {\n    findManyExperiences(ExperienceFilters: $experienceFilters, ExperiencePagination: $experiencePagination, ExperienceSort: $experienceSort) {\n      category\n      id\n      organization {\n        category\n        id\n        logo\n        name\n        slug\n        website\n      }\n      roles {\n        i18n {\n          locale\n          messages {\n            description\n            title\n          }\n        }\n        period {\n          from\n          to\n        }\n        skills {\n          category\n          id\n          name\n          slug\n        }\n      }\n      skills {\n        category\n        id\n        name\n        slug\n      }\n      slug\n    }\n  }\n": types.FindManyExperiencesDocument,
    "\n  query FindManyOrganizations($organizationFilters: FilterOrganizationInput, $organizationPagination: PaginationInput, $organizationSort: SortOrganizationInput) {\n    findManyOrganizations(OrganizationFilters: $organizationFilters, OrganizationPagination: $organizationPagination, OrganizationSort: $organizationSort) {\n      category\n      id\n      logo\n      name\n      slug\n      website\n    }\n  }\n": types.FindManyOrganizationsDocument,
    "\n  query FindManyProjects($projectFilters: FilterProjectInput, $projectPagination: PaginationInput, $projectSort: SortProjectInput) {\n    findManyProjects(ProjectFilters: $projectFilters, ProjectPagination: $projectPagination, ProjectSort: $projectSort) {\n      id\n      i18n {\n        locale\n        messages {\n          description\n          title\n        }\n      }\n      images\n      skills {\n        category\n        id\n        name\n        slug\n      }\n      slug\n      urls {\n        title\n        value\n      }\n    }\n  }\n": types.FindManyProjectsDocument,
    "\n  query FindManySkills($skillFilters: FilterSkillInput, $skillPagination: PaginationInput, $skillSort: SortSkillInput) {\n    findManySkills(SkillFilters: $skillFilters, SkillPagination: $skillPagination, SkillSort: $skillSort) {\n      category\n      id\n      name\n      slug\n    }\n  }\n": types.FindManySkillsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FindOneUserById($userId: ID!) {\n    findOneUserById(UserId: $userId) {\n      id\n      address\n      title\n      urls {\n        title\n        value\n      }\n      avatar\n      birth\n      email\n      name\n      nickname\n      phone\n      role\n    }\n  }\n"): typeof import('./graphql').FindOneUserByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FindManyEducations($educationFilters: FilterEducationInput, $educationPagination: PaginationInput, $educationSort: SortEducationInput) {\n    findManyEducations(EducationFilters: $educationFilters, EducationPagination: $educationPagination, EducationSort: $educationSort) {\n      category\n      url\n      status\n      hours\n      i18n {\n        locale\n        messages {\n          description\n          title\n        }\n      }\n      id\n      image\n      organization {\n        category\n        id\n        logo\n        name\n        slug\n        website\n      }\n      period {\n        from\n        to\n      }\n      skills {\n        category\n        id\n        name\n        slug\n      }\n      slug\n    }\n  }\n"): typeof import('./graphql').FindManyEducationsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FindManyExperiences($experienceFilters: FilterExperienceInput, $experiencePagination: PaginationInput, $experienceSort: SortExperienceInput) {\n    findManyExperiences(ExperienceFilters: $experienceFilters, ExperiencePagination: $experiencePagination, ExperienceSort: $experienceSort) {\n      category\n      id\n      organization {\n        category\n        id\n        logo\n        name\n        slug\n        website\n      }\n      roles {\n        i18n {\n          locale\n          messages {\n            description\n            title\n          }\n        }\n        period {\n          from\n          to\n        }\n        skills {\n          category\n          id\n          name\n          slug\n        }\n      }\n      skills {\n        category\n        id\n        name\n        slug\n      }\n      slug\n    }\n  }\n"): typeof import('./graphql').FindManyExperiencesDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FindManyOrganizations($organizationFilters: FilterOrganizationInput, $organizationPagination: PaginationInput, $organizationSort: SortOrganizationInput) {\n    findManyOrganizations(OrganizationFilters: $organizationFilters, OrganizationPagination: $organizationPagination, OrganizationSort: $organizationSort) {\n      category\n      id\n      logo\n      name\n      slug\n      website\n    }\n  }\n"): typeof import('./graphql').FindManyOrganizationsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FindManyProjects($projectFilters: FilterProjectInput, $projectPagination: PaginationInput, $projectSort: SortProjectInput) {\n    findManyProjects(ProjectFilters: $projectFilters, ProjectPagination: $projectPagination, ProjectSort: $projectSort) {\n      id\n      i18n {\n        locale\n        messages {\n          description\n          title\n        }\n      }\n      images\n      skills {\n        category\n        id\n        name\n        slug\n      }\n      slug\n      urls {\n        title\n        value\n      }\n    }\n  }\n"): typeof import('./graphql').FindManyProjectsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FindManySkills($skillFilters: FilterSkillInput, $skillPagination: PaginationInput, $skillSort: SortSkillInput) {\n    findManySkills(SkillFilters: $skillFilters, SkillPagination: $skillPagination, SkillSort: $skillSort) {\n      category\n      id\n      name\n      slug\n    }\n  }\n"): typeof import('./graphql').FindManySkillsDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
