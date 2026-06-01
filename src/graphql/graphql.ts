/* eslint-disable */
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type BatchEntity = {
  __typename?: 'BatchEntity';
  count: Scalars['Int']['output'];
};

export type CourseEntity = {
  __typename?: 'CourseEntity';
  createdAt: Scalars['DateTime']['output'];
  hours?: Maybe<Scalars['Int']['output']>;
  i18n: Array<CourseTranslationLocale>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  organization: OrganizationEntity;
  relevance: Scalars['Float']['output'];
  skills?: Maybe<Array<SkillEntity>>;
  slug: Scalars['String']['output'];
  status: CourseStatus;
  updatedAt: Scalars['DateTime']['output'];
  url?: Maybe<Scalars['String']['output']>;
};

export type CourseMessages = {
  __typename?: 'CourseMessages';
  description: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export enum CourseStatus {
  Complete = 'COMPLETE',
  Incomplete = 'INCOMPLETE',
  InProgress = 'IN_PROGRESS'
}

export type CourseTranslationLocale = {
  __typename?: 'CourseTranslationLocale';
  locale: Scalars['String']['output'];
  messages: CourseMessages;
};

export type CreateCourseInput = {
  hours?: InputMaybe<Scalars['Int']['input']>;
  i18n: Array<CreateCourseTranslationInput>;
  image?: InputMaybe<Scalars['String']['input']>;
  organization: Scalars['String']['input'];
  period?: InputMaybe<DateRangeInput>;
  relevance?: InputMaybe<Scalars['Float']['input']>;
  skills?: InputMaybe<Array<Scalars['String']['input']>>;
  slug: Scalars['String']['input'];
  status: CourseStatus;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type CreateCourseMessagesInput = {
  description: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateCourseTranslationInput = {
  locale: Scalars['String']['input'];
  messages: CreateCourseMessagesInput;
};

export type CreateEducationInput = {
  i18n: Array<CreateEducationTranslationInput>;
  image?: InputMaybe<Scalars['String']['input']>;
  level: EducationLevel;
  organization: Scalars['String']['input'];
  period?: InputMaybe<DateRangeInput>;
  relevance?: InputMaybe<Scalars['Float']['input']>;
  skills?: InputMaybe<Array<Scalars['String']['input']>>;
  slug: Scalars['String']['input'];
  status: EducationStatus;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type CreateEducationMessagesInput = {
  description: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateEducationTranslationInput = {
  locale: Scalars['String']['input'];
  messages: CreateEducationMessagesInput;
};

export type CreateExperienceInput = {
  category: ExperienceCategory;
  organization: Scalars['String']['input'];
  relevance?: InputMaybe<Scalars['Float']['input']>;
  roles: Array<CreateExperienceRoleInput>;
  slug: Scalars['String']['input'];
};

export type CreateExperienceMessagesInput = {
  description: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateExperienceRoleInput = {
  i18n: Array<CreateExperienceTranslationInput>;
  period?: InputMaybe<DateRangeInput>;
  skills?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type CreateExperienceTranslationInput = {
  locale: Scalars['String']['input'];
  messages: CreateExperienceMessagesInput;
};

export type CreateOrganizationInput = {
  category: OrganizationCategory;
  logo: Scalars['String']['input'];
  name: Scalars['String']['input'];
  relevance?: InputMaybe<Scalars['Float']['input']>;
  slug: Scalars['String']['input'];
  website: Scalars['String']['input'];
};

export type CreateProjectInput = {
  i18n: Array<CreateProjectMessagesInputTranslationInput>;
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  relevance?: InputMaybe<Scalars['Float']['input']>;
  skills?: InputMaybe<Array<Scalars['String']['input']>>;
  slug: Scalars['String']['input'];
  urls?: InputMaybe<Array<UrlInput>>;
};

export type CreateProjectMessagesInput = {
  description: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateProjectMessagesInputTranslationInput = {
  locale: Scalars['String']['input'];
  messages: CreateProjectMessagesInput;
};

export type CreateSkillInput = {
  category: SkillCategory;
  name: Scalars['String']['input'];
  relevance?: InputMaybe<Scalars['Float']['input']>;
  slug: Scalars['String']['input'];
};

export type CreateUserInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  birth?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  nickname: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  urls?: InputMaybe<Array<UrlInput>>;
};

export type DateRangeEntity = {
  __typename?: 'DateRangeEntity';
  from?: Maybe<Scalars['DateTime']['output']>;
  to?: Maybe<Scalars['DateTime']['output']>;
};

export type DateRangeInput = {
  from?: InputMaybe<Scalars['DateTime']['input']>;
  to?: InputMaybe<Scalars['DateTime']['input']>;
};

export type EducationEntity = {
  __typename?: 'EducationEntity';
  createdAt: Scalars['DateTime']['output'];
  i18n: Array<EducationTranslationLocale>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  level: EducationLevel;
  organization: OrganizationEntity;
  period?: Maybe<DateRangeEntity>;
  relevance: Scalars['Float']['output'];
  skills?: Maybe<Array<SkillEntity>>;
  slug: Scalars['String']['output'];
  status: EducationStatus;
  updatedAt: Scalars['DateTime']['output'];
  url?: Maybe<Scalars['String']['output']>;
};

export enum EducationLevel {
  Bachelor = 'BACHELOR',
  Doctorate = 'DOCTORATE',
  HighSchool = 'HIGH_SCHOOL',
  Master = 'MASTER',
  Postgrad = 'POSTGRAD',
  Technical = 'TECHNICAL'
}

export type EducationMessages = {
  __typename?: 'EducationMessages';
  description: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export enum EducationStatus {
  Complete = 'COMPLETE',
  Incomplete = 'INCOMPLETE',
  InProgress = 'IN_PROGRESS'
}

export type EducationTranslationLocale = {
  __typename?: 'EducationTranslationLocale';
  locale: Scalars['String']['output'];
  messages: EducationMessages;
};

export enum ExperienceCategory {
  Freelance = 'FREELANCE',
  FullTime = 'FULL_TIME',
  PartTime = 'PART_TIME',
  Volunteer = 'VOLUNTEER'
}

export type ExperienceEntity = {
  __typename?: 'ExperienceEntity';
  category: ExperienceCategory;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  organization: OrganizationEntity;
  relevance: Scalars['Float']['output'];
  roles: Array<ExperienceRole>;
  skills?: Maybe<Array<SkillEntity>>;
  slug: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ExperienceMessages = {
  __typename?: 'ExperienceMessages';
  description: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type ExperienceRole = {
  __typename?: 'ExperienceRole';
  i18n: Array<ExperienceTranslationLocale>;
  period?: Maybe<DateRangeEntity>;
  skills?: Maybe<Array<SkillEntity>>;
};

export type ExperienceTranslationLocale = {
  __typename?: 'ExperienceTranslationLocale';
  locale: Scalars['String']['output'];
  messages: ExperienceMessages;
};

export type FilterCourseInput = {
  hours?: InputMaybe<Scalars['Int']['input']>;
  i18n?: InputMaybe<Array<CreateCourseTranslationInput>>;
  image?: InputMaybe<Scalars['String']['input']>;
  organization?: InputMaybe<Scalars['String']['input']>;
  period?: InputMaybe<DateRangeInput>;
  relevance?: InputMaybe<Scalars['Float']['input']>;
  skills?: InputMaybe<Array<Scalars['String']['input']>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<CourseStatus>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type FilterEducationInput = {
  i18n?: InputMaybe<Array<CreateEducationTranslationInput>>;
  image?: InputMaybe<Scalars['String']['input']>;
  level?: InputMaybe<EducationLevel>;
  organization?: InputMaybe<Scalars['String']['input']>;
  period?: InputMaybe<DateRangeInput>;
  relevance?: InputMaybe<Scalars['Float']['input']>;
  skills?: InputMaybe<Array<Scalars['String']['input']>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<EducationStatus>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type FilterExperienceInput = {
  category?: InputMaybe<ExperienceCategory>;
  organization?: InputMaybe<Scalars['String']['input']>;
  relevance?: InputMaybe<Scalars['Float']['input']>;
  roles?: InputMaybe<Array<CreateExperienceRoleInput>>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type FilterOrganizationInput = {
  category?: InputMaybe<OrganizationCategory>;
  logo?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  relevance?: InputMaybe<Scalars['Float']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type FilterProjectInput = {
  i18n?: InputMaybe<Array<CreateProjectMessagesInputTranslationInput>>;
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  relevance?: InputMaybe<Scalars['Float']['input']>;
  skills?: InputMaybe<Array<Scalars['String']['input']>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  urls?: InputMaybe<Array<UrlInput>>;
};

export type FilterSkillInput = {
  category?: InputMaybe<SkillCategory>;
  name?: InputMaybe<Scalars['String']['input']>;
  relevance?: InputMaybe<Scalars['Float']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type FilterUserInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  birth?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  nickname?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  urls?: InputMaybe<Array<UrlInput>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createManyCourses: Array<CourseEntity>;
  createManyEducations: Array<EducationEntity>;
  createManyExperiences: Array<ExperienceEntity>;
  createManyOrganizations: Array<OrganizationEntity>;
  createManyProjects: Array<ProjectEntity>;
  createManySkills: Array<SkillEntity>;
  createManyUsers: Array<UserEntity>;
  createOneCourse: CourseEntity;
  createOneEducation: EducationEntity;
  createOneExperience: ExperienceEntity;
  createOneOrganization: OrganizationEntity;
  createOneProject: ProjectEntity;
  createOneSkill: SkillEntity;
  createOneUser: UserEntity;
  removeManyCourses: BatchEntity;
  removeManyEducations: BatchEntity;
  removeManyExperiences: BatchEntity;
  removeManyOrganizations: BatchEntity;
  removeManyProjects: BatchEntity;
  removeManySkills: BatchEntity;
  removeManyUsers: BatchEntity;
  removeOneCourse: CourseEntity;
  removeOneEducation: EducationEntity;
  removeOneExperience: ExperienceEntity;
  removeOneOrganization: OrganizationEntity;
  removeOneProject: ProjectEntity;
  removeOneSkill: SkillEntity;
  removeOneUser: UserEntity;
  signIn: Scalars['String']['output'];
  updateManyCourses: BatchEntity;
  updateManyEducations: BatchEntity;
  updateManyExperiences: BatchEntity;
  updateManyOrganizations: BatchEntity;
  updateManyProjects: BatchEntity;
  updateManySkills: BatchEntity;
  updateManyUsers: BatchEntity;
  updateOneCourse: CourseEntity;
  updateOneEducation: EducationEntity;
  updateOneExperience: ExperienceEntity;
  updateOneOrganization: OrganizationEntity;
  updateOneProject: ProjectEntity;
  updateOneSkill: SkillEntity;
  updateOneUser: UserEntity;
};


export type MutationCreateManyCoursesArgs = {
  createCourseInputs: Array<CreateCourseInput>;
};


export type MutationCreateManyEducationsArgs = {
  createEducationInputs: Array<CreateEducationInput>;
};


export type MutationCreateManyExperiencesArgs = {
  createExperienceInputs: Array<CreateExperienceInput>;
};


export type MutationCreateManyOrganizationsArgs = {
  createOrganizationInputs: Array<CreateOrganizationInput>;
};


export type MutationCreateManyProjectsArgs = {
  createProjectInputs: Array<CreateProjectInput>;
};


export type MutationCreateManySkillsArgs = {
  createSkillInputs: Array<CreateSkillInput>;
};


export type MutationCreateManyUsersArgs = {
  createUserInputs: Array<CreateUserInput>;
};


export type MutationCreateOneCourseArgs = {
  createCourseInput: CreateCourseInput;
};


export type MutationCreateOneEducationArgs = {
  createEducationInput: CreateEducationInput;
};


export type MutationCreateOneExperienceArgs = {
  createExperienceInput: CreateExperienceInput;
};


export type MutationCreateOneOrganizationArgs = {
  createOrganizationInput: CreateOrganizationInput;
};


export type MutationCreateOneProjectArgs = {
  createProjectInput: CreateProjectInput;
};


export type MutationCreateOneSkillArgs = {
  createSkillInput: CreateSkillInput;
};


export type MutationCreateOneUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationRemoveManyCoursesArgs = {
  courseIds: Array<Scalars['ID']['input']>;
};


export type MutationRemoveManyEducationsArgs = {
  educationIds: Array<Scalars['ID']['input']>;
};


export type MutationRemoveManyExperiencesArgs = {
  experienceIds: Array<Scalars['ID']['input']>;
};


export type MutationRemoveManyOrganizationsArgs = {
  organizationIds: Array<Scalars['ID']['input']>;
};


export type MutationRemoveManyProjectsArgs = {
  projectIds: Array<Scalars['ID']['input']>;
};


export type MutationRemoveManySkillsArgs = {
  skillIds: Array<Scalars['ID']['input']>;
};


export type MutationRemoveManyUsersArgs = {
  userIds: Array<Scalars['ID']['input']>;
};


export type MutationRemoveOneCourseArgs = {
  courseId: Scalars['ID']['input'];
};


export type MutationRemoveOneEducationArgs = {
  educationId: Scalars['ID']['input'];
};


export type MutationRemoveOneExperienceArgs = {
  experienceId: Scalars['ID']['input'];
};


export type MutationRemoveOneOrganizationArgs = {
  organizationId: Scalars['ID']['input'];
};


export type MutationRemoveOneProjectArgs = {
  projectId: Scalars['ID']['input'];
};


export type MutationRemoveOneSkillArgs = {
  skillId: Scalars['ID']['input'];
};


export type MutationRemoveOneUserArgs = {
  userId: Scalars['ID']['input'];
};


export type MutationSignInArgs = {
  signInInput: SignInInput;
};


export type MutationUpdateManyCoursesArgs = {
  courseIds: Array<Scalars['ID']['input']>;
  updateCourseInput: UpdateCourseInput;
};


export type MutationUpdateManyEducationsArgs = {
  educationIds: Array<Scalars['ID']['input']>;
  updateEducationInput: UpdateEducationInput;
};


export type MutationUpdateManyExperiencesArgs = {
  experienceIds: Array<Scalars['ID']['input']>;
  updateExperienceInput: UpdateExperienceInput;
};


export type MutationUpdateManyOrganizationsArgs = {
  organizationIds: Array<Scalars['ID']['input']>;
  updateOrganizationInput: UpdateOrganizationInput;
};


export type MutationUpdateManyProjectsArgs = {
  projectIds: Array<Scalars['ID']['input']>;
  updateProjectInput: UpdateProjectInput;
};


export type MutationUpdateManySkillsArgs = {
  skillIds: Array<Scalars['ID']['input']>;
  updateSkillInput: UpdateSkillInput;
};


export type MutationUpdateManyUsersArgs = {
  updateUserInput: UpdateUserInput;
  userIds: Array<Scalars['ID']['input']>;
};


export type MutationUpdateOneCourseArgs = {
  courseId: Scalars['ID']['input'];
  updateCourseInput: UpdateCourseInput;
};


export type MutationUpdateOneEducationArgs = {
  educationId: Scalars['ID']['input'];
  updateEducationInput: UpdateEducationInput;
};


export type MutationUpdateOneExperienceArgs = {
  experienceId: Scalars['ID']['input'];
  updateExperienceInput: UpdateExperienceInput;
};


export type MutationUpdateOneOrganizationArgs = {
  organizationId: Scalars['ID']['input'];
  updateOrganizationInput: UpdateOrganizationInput;
};


export type MutationUpdateOneProjectArgs = {
  projectId: Scalars['ID']['input'];
  updateProjectInput: UpdateProjectInput;
};


export type MutationUpdateOneSkillArgs = {
  skillId: Scalars['ID']['input'];
  updateSkillInput: UpdateSkillInput;
};


export type MutationUpdateOneUserArgs = {
  updateUserInput: UpdateUserInput;
  userId: Scalars['ID']['input'];
};

export enum OrganizationCategory {
  Company = 'COMPANY',
  Other = 'OTHER',
  School = 'SCHOOL'
}

export type OrganizationEntity = {
  __typename?: 'OrganizationEntity';
  category: OrganizationCategory;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  logo: Scalars['String']['output'];
  name: Scalars['String']['output'];
  relevance: Scalars['Float']['output'];
  slug: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  website: Scalars['String']['output'];
};

export type PaginatedCourseEntity = {
  __typename?: 'PaginatedCourseEntity';
  found: Scalars['Float']['output'];
  nodes: Array<CourseEntity>;
};

export type PaginatedEducationEntity = {
  __typename?: 'PaginatedEducationEntity';
  found: Scalars['Float']['output'];
  nodes: Array<EducationEntity>;
};

export type PaginatedExperienceEntity = {
  __typename?: 'PaginatedExperienceEntity';
  found: Scalars['Float']['output'];
  nodes: Array<ExperienceEntity>;
};

export type PaginatedOrganizationEntity = {
  __typename?: 'PaginatedOrganizationEntity';
  found: Scalars['Float']['output'];
  nodes: Array<OrganizationEntity>;
};

export type PaginatedProjectEntity = {
  __typename?: 'PaginatedProjectEntity';
  found: Scalars['Float']['output'];
  nodes: Array<ProjectEntity>;
};

export type PaginatedSkillEntity = {
  __typename?: 'PaginatedSkillEntity';
  found: Scalars['Float']['output'];
  nodes: Array<SkillEntity>;
};

export type PaginatedUserEntity = {
  __typename?: 'PaginatedUserEntity';
  found: Scalars['Float']['output'];
  nodes: Array<UserEntity>;
};

export type PaginationInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type ProjectEntity = {
  __typename?: 'ProjectEntity';
  createdAt: Scalars['DateTime']['output'];
  i18n: Array<ProjectMessagesTranslationEntity>;
  id: Scalars['ID']['output'];
  images?: Maybe<Array<Scalars['String']['output']>>;
  relevance: Scalars['Float']['output'];
  skills?: Maybe<Array<SkillEntity>>;
  slug: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  urls?: Maybe<Array<UrlEntity>>;
};

export type ProjectMessages = {
  __typename?: 'ProjectMessages';
  description: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type ProjectMessagesTranslationEntity = {
  __typename?: 'ProjectMessagesTranslationEntity';
  locale: Scalars['String']['output'];
  messages: ProjectMessages;
};

export type Query = {
  __typename?: 'Query';
  findManyCourseById: Array<CourseEntity>;
  findManyCourses: PaginatedCourseEntity;
  findManyEducationById: Array<EducationEntity>;
  findManyEducations: PaginatedEducationEntity;
  findManyExperienceById: Array<ExperienceEntity>;
  findManyExperiences: PaginatedExperienceEntity;
  findManyOrganizationById: Array<OrganizationEntity>;
  findManyOrganizations: PaginatedOrganizationEntity;
  findManyProjectById: Array<ProjectEntity>;
  findManyProjects: PaginatedProjectEntity;
  findManySkillById: Array<SkillEntity>;
  findManySkills: PaginatedSkillEntity;
  findManyUserById: Array<UserEntity>;
  findManyUsers: PaginatedUserEntity;
  findOneCourse: CourseEntity;
  findOneCourseById: CourseEntity;
  findOneEducation: EducationEntity;
  findOneEducationById: EducationEntity;
  findOneExperience: ExperienceEntity;
  findOneExperienceById: ExperienceEntity;
  findOneOrganization: OrganizationEntity;
  findOneOrganizationById: OrganizationEntity;
  findOneProject: ProjectEntity;
  findOneProjectById: ProjectEntity;
  findOneSkill: SkillEntity;
  findOneSkillById: SkillEntity;
  findOneUser: UserEntity;
  findOneUserById: UserEntity;
  getMe: UserEntity;
};


export type QueryFindManyCourseByIdArgs = {
  courseIds: Array<Scalars['ID']['input']>;
};


export type QueryFindManyCoursesArgs = {
  courseFilters?: InputMaybe<FilterCourseInput>;
  coursePagination?: InputMaybe<PaginationInput>;
  courseSort?: InputMaybe<SortCourseInput>;
};


export type QueryFindManyEducationByIdArgs = {
  educationIds: Array<Scalars['ID']['input']>;
};


export type QueryFindManyEducationsArgs = {
  educationFilters?: InputMaybe<FilterEducationInput>;
  educationPagination?: InputMaybe<PaginationInput>;
  educationSort?: InputMaybe<SortEducationInput>;
};


export type QueryFindManyExperienceByIdArgs = {
  experienceIds: Array<Scalars['ID']['input']>;
};


export type QueryFindManyExperiencesArgs = {
  experienceFilters?: InputMaybe<FilterExperienceInput>;
  experiencePagination?: InputMaybe<PaginationInput>;
  experienceSort?: InputMaybe<SortExperienceInput>;
};


export type QueryFindManyOrganizationByIdArgs = {
  organizationIds: Array<Scalars['ID']['input']>;
};


export type QueryFindManyOrganizationsArgs = {
  organizationFilters?: InputMaybe<FilterOrganizationInput>;
  organizationPagination?: InputMaybe<PaginationInput>;
  organizationSort?: InputMaybe<SortOrganizationInput>;
};


export type QueryFindManyProjectByIdArgs = {
  projectIds: Array<Scalars['ID']['input']>;
};


export type QueryFindManyProjectsArgs = {
  projectFilters?: InputMaybe<FilterProjectInput>;
  projectPagination?: InputMaybe<PaginationInput>;
  projectSort?: InputMaybe<SortProjectInput>;
};


export type QueryFindManySkillByIdArgs = {
  skillIds: Array<Scalars['ID']['input']>;
};


export type QueryFindManySkillsArgs = {
  skillFilters?: InputMaybe<FilterSkillInput>;
  skillPagination?: InputMaybe<PaginationInput>;
  skillSort?: InputMaybe<SortSkillInput>;
};


export type QueryFindManyUserByIdArgs = {
  userIds: Array<Scalars['ID']['input']>;
};


export type QueryFindManyUsersArgs = {
  userFilters?: InputMaybe<FilterUserInput>;
  userPagination?: InputMaybe<PaginationInput>;
  userSort?: InputMaybe<SortUserInput>;
};


export type QueryFindOneCourseArgs = {
  courseFilters?: InputMaybe<FilterCourseInput>;
};


export type QueryFindOneCourseByIdArgs = {
  courseId: Scalars['ID']['input'];
};


export type QueryFindOneEducationArgs = {
  educationFilters?: InputMaybe<FilterEducationInput>;
};


export type QueryFindOneEducationByIdArgs = {
  educationId: Scalars['ID']['input'];
};


export type QueryFindOneExperienceArgs = {
  experienceFilters?: InputMaybe<FilterExperienceInput>;
};


export type QueryFindOneExperienceByIdArgs = {
  experienceId: Scalars['ID']['input'];
};


export type QueryFindOneOrganizationArgs = {
  organizationFilters?: InputMaybe<FilterOrganizationInput>;
};


export type QueryFindOneOrganizationByIdArgs = {
  organizationId: Scalars['ID']['input'];
};


export type QueryFindOneProjectArgs = {
  projectFilters?: InputMaybe<FilterProjectInput>;
};


export type QueryFindOneProjectByIdArgs = {
  projectId: Scalars['ID']['input'];
};


export type QueryFindOneSkillArgs = {
  skillFilters?: InputMaybe<FilterSkillInput>;
};


export type QueryFindOneSkillByIdArgs = {
  skillId: Scalars['ID']['input'];
};


export type QueryFindOneUserArgs = {
  userFilters?: InputMaybe<FilterUserInput>;
};


export type QueryFindOneUserByIdArgs = {
  userId: Scalars['ID']['input'];
};

export type SignInInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export enum SkillCategory {
  Backend = 'BACKEND',
  Data = 'DATA',
  Devops = 'DEVOPS',
  Frontend = 'FRONTEND',
  Language = 'LANGUAGE'
}

export type SkillEntity = {
  __typename?: 'SkillEntity';
  category: SkillCategory;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  relevance: Scalars['Float']['output'];
  slug: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type SortCourseInput = {
  createdAt?: InputMaybe<SortEnum>;
  relevance?: InputMaybe<SortEnum>;
  updatedAt?: InputMaybe<SortEnum>;
};

export type SortEducationInput = {
  createdAt?: InputMaybe<SortEnum>;
  relevance?: InputMaybe<SortEnum>;
  updatedAt?: InputMaybe<SortEnum>;
};

export enum SortEnum {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type SortExperienceInput = {
  createdAt?: InputMaybe<SortEnum>;
  relevance?: InputMaybe<SortEnum>;
  updatedAt?: InputMaybe<SortEnum>;
};

export type SortOrganizationInput = {
  createdAt?: InputMaybe<SortEnum>;
  name?: InputMaybe<SortEnum>;
  relevance?: InputMaybe<SortEnum>;
  updatedAt?: InputMaybe<SortEnum>;
};

export type SortProjectInput = {
  createdAt?: InputMaybe<SortEnum>;
  relevance?: InputMaybe<SortEnum>;
  updatedAt?: InputMaybe<SortEnum>;
};

export type SortSkillInput = {
  createdAt?: InputMaybe<SortEnum>;
  name?: InputMaybe<SortEnum>;
  relevance?: InputMaybe<SortEnum>;
  updatedAt?: InputMaybe<SortEnum>;
};

export type SortUserInput = {
  createdAt?: InputMaybe<SortEnum>;
  name?: InputMaybe<SortEnum>;
  updatedAt?: InputMaybe<SortEnum>;
};

export type UpdateCourseInput = {
  hours?: InputMaybe<Scalars['Int']['input']>;
  i18n?: InputMaybe<Array<CreateCourseTranslationInput>>;
  image?: InputMaybe<Scalars['String']['input']>;
  organization?: InputMaybe<Scalars['String']['input']>;
  period?: InputMaybe<DateRangeInput>;
  relevance?: InputMaybe<Scalars['Float']['input']>;
  skills?: InputMaybe<Array<Scalars['String']['input']>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<CourseStatus>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateEducationInput = {
  i18n?: InputMaybe<Array<CreateEducationTranslationInput>>;
  image?: InputMaybe<Scalars['String']['input']>;
  level?: InputMaybe<EducationLevel>;
  organization?: InputMaybe<Scalars['String']['input']>;
  period?: InputMaybe<DateRangeInput>;
  relevance?: InputMaybe<Scalars['Float']['input']>;
  skills?: InputMaybe<Array<Scalars['String']['input']>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<EducationStatus>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateExperienceInput = {
  category?: InputMaybe<ExperienceCategory>;
  organization?: InputMaybe<Scalars['String']['input']>;
  relevance?: InputMaybe<Scalars['Float']['input']>;
  roles?: InputMaybe<Array<CreateExperienceRoleInput>>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateOrganizationInput = {
  category?: InputMaybe<OrganizationCategory>;
  logo?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  relevance?: InputMaybe<Scalars['Float']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProjectInput = {
  i18n?: InputMaybe<Array<CreateProjectMessagesInputTranslationInput>>;
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  relevance?: InputMaybe<Scalars['Float']['input']>;
  skills?: InputMaybe<Array<Scalars['String']['input']>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  urls?: InputMaybe<Array<UrlInput>>;
};

export type UpdateSkillInput = {
  category?: InputMaybe<SkillCategory>;
  name?: InputMaybe<Scalars['String']['input']>;
  relevance?: InputMaybe<Scalars['Float']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  birth?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  nickname?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  urls?: InputMaybe<Array<UrlInput>>;
};

export type UrlEntity = {
  __typename?: 'UrlEntity';
  title: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type UrlInput = {
  title: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type UserEntity = {
  __typename?: 'UserEntity';
  address?: Maybe<Scalars['String']['output']>;
  avatar?: Maybe<Scalars['String']['output']>;
  birth?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  nickname: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  role: Scalars['String']['output'];
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  urls?: Maybe<Array<UrlEntity>>;
};

export type FindOneUserByIdQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type FindOneUserByIdQuery = { __typename?: 'Query', findOneUserById: { __typename?: 'UserEntity', id: string, address?: string | null, title?: string | null, avatar?: string | null, birth?: string | null, email: string, name: string, nickname: string, phone?: string | null, role: string, urls?: Array<{ __typename?: 'UrlEntity', title: string, value: string }> | null } };

export type FindManyEducationsQueryVariables = Exact<{
  educationFilters?: InputMaybe<FilterEducationInput>;
  educationPagination?: InputMaybe<PaginationInput>;
  educationSort?: InputMaybe<SortEducationInput>;
}>;


export type FindManyEducationsQuery = { __typename?: 'Query', findManyEducations: { __typename?: 'PaginatedEducationEntity', found: number, nodes: Array<{ __typename?: 'EducationEntity', level: EducationLevel, url?: string | null, status: EducationStatus, id: string, image?: string | null, slug: string, i18n: Array<{ __typename?: 'EducationTranslationLocale', locale: string, messages: { __typename?: 'EducationMessages', description: string, title: string } }>, organization: { __typename?: 'OrganizationEntity', category: OrganizationCategory, id: string, logo: string, name: string, slug: string, website: string }, period?: { __typename?: 'DateRangeEntity', from?: any | null, to?: any | null } | null, skills?: Array<{ __typename?: 'SkillEntity', category: SkillCategory, id: string, name: string, slug: string }> | null }> } };

export type FindManyExperiencesQueryVariables = Exact<{
  experienceFilters?: InputMaybe<FilterExperienceInput>;
  experiencePagination?: InputMaybe<PaginationInput>;
  experienceSort?: InputMaybe<SortExperienceInput>;
}>;


export type FindManyExperiencesQuery = { __typename?: 'Query', findManyExperiences: { __typename?: 'PaginatedExperienceEntity', found: number, nodes: Array<{ __typename?: 'ExperienceEntity', category: ExperienceCategory, id: string, slug: string, organization: { __typename?: 'OrganizationEntity', category: OrganizationCategory, id: string, logo: string, name: string, slug: string, website: string }, roles: Array<{ __typename?: 'ExperienceRole', i18n: Array<{ __typename?: 'ExperienceTranslationLocale', locale: string, messages: { __typename?: 'ExperienceMessages', description: string, title: string } }>, period?: { __typename?: 'DateRangeEntity', from?: any | null, to?: any | null } | null, skills?: Array<{ __typename?: 'SkillEntity', category: SkillCategory, id: string, name: string, slug: string }> | null }>, skills?: Array<{ __typename?: 'SkillEntity', category: SkillCategory, id: string, name: string, slug: string }> | null }> } };

export type FindManyOrganizationsQueryVariables = Exact<{
  organizationFilters?: InputMaybe<FilterOrganizationInput>;
  organizationPagination?: InputMaybe<PaginationInput>;
  organizationSort?: InputMaybe<SortOrganizationInput>;
}>;


export type FindManyOrganizationsQuery = { __typename?: 'Query', findManyOrganizations: { __typename?: 'PaginatedOrganizationEntity', found: number, nodes: Array<{ __typename?: 'OrganizationEntity', category: OrganizationCategory, id: string, logo: string, name: string, slug: string, website: string }> } };

export type FindManyProjectsQueryVariables = Exact<{
  projectFilters?: InputMaybe<FilterProjectInput>;
  projectPagination?: InputMaybe<PaginationInput>;
  projectSort?: InputMaybe<SortProjectInput>;
}>;


export type FindManyProjectsQuery = { __typename?: 'Query', findManyProjects: { __typename?: 'PaginatedProjectEntity', found: number, nodes: Array<{ __typename?: 'ProjectEntity', id: string, images?: Array<string> | null, slug: string, i18n: Array<{ __typename?: 'ProjectMessagesTranslationEntity', locale: string, messages: { __typename?: 'ProjectMessages', description: string, title: string } }>, skills?: Array<{ __typename?: 'SkillEntity', category: SkillCategory, id: string, name: string, slug: string }> | null, urls?: Array<{ __typename?: 'UrlEntity', title: string, value: string }> | null }> } };

export type FindManySkillsQueryVariables = Exact<{
  skillFilters?: InputMaybe<FilterSkillInput>;
  skillPagination?: InputMaybe<PaginationInput>;
  skillSort?: InputMaybe<SortSkillInput>;
}>;


export type FindManySkillsQuery = { __typename?: 'Query', findManySkills: { __typename?: 'PaginatedSkillEntity', found: number, nodes: Array<{ __typename?: 'SkillEntity', category: SkillCategory, id: string, name: string, slug: string }> } };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: NonNullable<DocumentTypeDecoration<TResult, TVariables>['__apiType']>;
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  override toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const FindOneUserByIdDocument = new TypedDocumentString(`
    query FindOneUserById($userId: ID!) {
  findOneUserById(userId: $userId) {
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
    `) as unknown as TypedDocumentString<FindOneUserByIdQuery, FindOneUserByIdQueryVariables>;
export const FindManyEducationsDocument = new TypedDocumentString(`
    query FindManyEducations($educationFilters: FilterEducationInput, $educationPagination: PaginationInput, $educationSort: SortEducationInput) {
  findManyEducations(
    educationFilters: $educationFilters
    educationPagination: $educationPagination
    educationSort: $educationSort
  ) {
    found
    nodes {
      level
      url
      status
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
}
    `) as unknown as TypedDocumentString<FindManyEducationsQuery, FindManyEducationsQueryVariables>;
export const FindManyExperiencesDocument = new TypedDocumentString(`
    query FindManyExperiences($experienceFilters: FilterExperienceInput, $experiencePagination: PaginationInput, $experienceSort: SortExperienceInput) {
  findManyExperiences(
    experienceFilters: $experienceFilters
    experiencePagination: $experiencePagination
    experienceSort: $experienceSort
  ) {
    found
    nodes {
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
}
    `) as unknown as TypedDocumentString<FindManyExperiencesQuery, FindManyExperiencesQueryVariables>;
export const FindManyOrganizationsDocument = new TypedDocumentString(`
    query FindManyOrganizations($organizationFilters: FilterOrganizationInput, $organizationPagination: PaginationInput, $organizationSort: SortOrganizationInput) {
  findManyOrganizations(
    organizationFilters: $organizationFilters
    organizationPagination: $organizationPagination
    organizationSort: $organizationSort
  ) {
    found
    nodes {
      category
      id
      logo
      name
      slug
      website
    }
  }
}
    `) as unknown as TypedDocumentString<FindManyOrganizationsQuery, FindManyOrganizationsQueryVariables>;
export const FindManyProjectsDocument = new TypedDocumentString(`
    query FindManyProjects($projectFilters: FilterProjectInput, $projectPagination: PaginationInput, $projectSort: SortProjectInput) {
  findManyProjects(
    projectFilters: $projectFilters
    projectPagination: $projectPagination
    projectSort: $projectSort
  ) {
    found
    nodes {
      id
      i18n {
        locale
        messages {
          description
          title
        }
      }
      images
      skills {
        category
        id
        name
        slug
      }
      slug
      urls {
        title
        value
      }
    }
  }
}
    `) as unknown as TypedDocumentString<FindManyProjectsQuery, FindManyProjectsQueryVariables>;
export const FindManySkillsDocument = new TypedDocumentString(`
    query FindManySkills($skillFilters: FilterSkillInput, $skillPagination: PaginationInput, $skillSort: SortSkillInput) {
  findManySkills(
    skillFilters: $skillFilters
    skillPagination: $skillPagination
    skillSort: $skillSort
  ) {
    found
    nodes {
      category
      id
      name
      slug
    }
  }
}
    `) as unknown as TypedDocumentString<FindManySkillsQuery, FindManySkillsQueryVariables>;