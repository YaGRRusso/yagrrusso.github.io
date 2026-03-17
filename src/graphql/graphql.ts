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

export type CreateEducationInput = {
  category: Scalars['String']['input'];
  hours?: InputMaybe<Scalars['Int']['input']>;
  i18n: Array<CreateEducationTranslationInput>;
  image?: InputMaybe<Scalars['String']['input']>;
  organization: Scalars['String']['input'];
  period?: InputMaybe<DateRangeInput>;
  skills?: InputMaybe<Array<Scalars['String']['input']>>;
  slug: Scalars['String']['input'];
  status: Scalars['String']['input'];
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
  category: Scalars['String']['input'];
  organization: Scalars['String']['input'];
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
  category: Scalars['String']['input'];
  logo: Scalars['String']['input'];
  name: Scalars['String']['input'];
  slug: Scalars['String']['input'];
  website: Scalars['String']['input'];
};

export type CreateProjectInput = {
  i18n: Array<CreateProjectMessagesInputTranslationInput>;
  images?: InputMaybe<Array<Scalars['String']['input']>>;
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
  category: Scalars['String']['input'];
  name: Scalars['String']['input'];
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

export type Education = {
  __typename?: 'Education';
  category: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  hours?: Maybe<Scalars['Int']['output']>;
  i18n: Array<EducationTranslationLocale>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  organization: Organization;
  period?: Maybe<DateRangeEntity>;
  skills?: Maybe<Array<Skill>>;
  slug: Scalars['String']['output'];
  status: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  url?: Maybe<Scalars['String']['output']>;
};

export type EducationMessages = {
  __typename?: 'EducationMessages';
  description: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type EducationTranslationLocale = {
  __typename?: 'EducationTranslationLocale';
  locale: Scalars['String']['output'];
  messages: EducationMessages;
};

export type Experience = {
  __typename?: 'Experience';
  category: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  organization: Organization;
  roles: Array<ExperienceRole>;
  skills?: Maybe<Array<Skill>>;
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
  skills?: Maybe<Array<Skill>>;
};

export type ExperienceTranslationLocale = {
  __typename?: 'ExperienceTranslationLocale';
  locale: Scalars['String']['output'];
  messages: ExperienceMessages;
};

export type Mutation = {
  __typename?: 'Mutation';
  createEducation: Array<Education>;
  createExperience: Array<Experience>;
  createOrganization: Array<Organization>;
  createProject: Array<Project>;
  createSkill: Array<Skill>;
  createUser: User;
  removeEducation: Array<Education>;
  removeExperience: Array<Experience>;
  removeOrganization: Array<Organization>;
  removeProject: Array<Project>;
  removeSkill: Array<Skill>;
  removeUser: User;
  signIn: Scalars['String']['output'];
  updateEducation: Education;
  updateExperience: Experience;
  updateOrganization: Organization;
  updateProject: Project;
  updateSkill: Skill;
  updateUser: User;
};


export type MutationCreateEducationArgs = {
  createEducationInput: Array<CreateEducationInput>;
};


export type MutationCreateExperienceArgs = {
  createExperienceInput: Array<CreateExperienceInput>;
};


export type MutationCreateOrganizationArgs = {
  createOrganizationInput: Array<CreateOrganizationInput>;
};


export type MutationCreateProjectArgs = {
  createProjectInput: Array<CreateProjectInput>;
};


export type MutationCreateSkillArgs = {
  createSkillInput: Array<CreateSkillInput>;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationRemoveEducationArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveExperienceArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveOrganizationArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveProjectArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveSkillArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSignInArgs = {
  signInInput: SignInInput;
};


export type MutationUpdateEducationArgs = {
  updateEducationInput: UpdateEducationInput;
};


export type MutationUpdateExperienceArgs = {
  updateExperienceInput: UpdateExperienceInput;
};


export type MutationUpdateOrganizationArgs = {
  updateOrganizationInput: UpdateOrganizationInput;
};


export type MutationUpdateProjectArgs = {
  updateProjectInput: UpdateProjectInput;
};


export type MutationUpdateSkillArgs = {
  updateSkillInput: UpdateSkillInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type Organization = {
  __typename?: 'Organization';
  category: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  logo: Scalars['String']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  website: Scalars['String']['output'];
};

export type Project = {
  __typename?: 'Project';
  createdAt: Scalars['DateTime']['output'];
  i18n: Array<ProjectMessagesTranslationEntity>;
  id: Scalars['ID']['output'];
  images?: Maybe<Array<Scalars['String']['output']>>;
  skills?: Maybe<Array<Skill>>;
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
  findAllEducations: Array<Education>;
  findAllExperiences: Array<Experience>;
  findAllOrganizations: Array<Organization>;
  findAllProjects: Array<Project>;
  findAllSkills: Array<Skill>;
  findAllUsers: Array<User>;
  findOneEducationById: Education;
  findOneExperienceById: Experience;
  findOneOrganizationById: Organization;
  findOneProjectById: Project;
  findOneSkillById: Skill;
  findOneUserById: User;
  getMe: User;
};


export type QueryFindOneEducationByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFindOneExperienceByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFindOneOrganizationByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFindOneProjectByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFindOneSkillByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFindOneUserByIdArgs = {
  id: Scalars['ID']['input'];
};

export type SignInInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Skill = {
  __typename?: 'Skill';
  category: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type UpdateEducationInput = {
  category?: InputMaybe<Scalars['String']['input']>;
  hours?: InputMaybe<Scalars['Int']['input']>;
  i18n?: InputMaybe<Array<CreateEducationTranslationInput>>;
  id: Scalars['ID']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  organization?: InputMaybe<Scalars['String']['input']>;
  period?: InputMaybe<DateRangeInput>;
  skills?: InputMaybe<Array<Scalars['String']['input']>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateExperienceInput = {
  category?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  organization?: InputMaybe<Scalars['String']['input']>;
  roles?: InputMaybe<Array<CreateExperienceRoleInput>>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateOrganizationInput = {
  category?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  logo?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProjectInput = {
  i18n?: InputMaybe<Array<CreateProjectMessagesInputTranslationInput>>;
  id: Scalars['ID']['input'];
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  skills?: InputMaybe<Array<Scalars['String']['input']>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  urls?: InputMaybe<Array<UrlInput>>;
};

export type UpdateSkillInput = {
  category?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  birth?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
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

export type User = {
  __typename?: 'User';
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
  findOneUserByIdId: Scalars['ID']['input'];
}>;


export type FindOneUserByIdQuery = { __typename?: 'Query', findOneUserById: { __typename?: 'User', id: string, address?: string | null, title?: string | null, avatar?: string | null, birth?: string | null, email: string, name: string, nickname: string, phone?: string | null, role: string, urls?: Array<{ __typename?: 'UrlEntity', title: string, value: string }> | null } };

export type FindAllEducationsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllEducationsQuery = { __typename?: 'Query', findAllEducations: Array<{ __typename?: 'Education', category: string, url?: string | null, status: string, hours?: number | null, id: string, image?: string | null, slug: string, i18n: Array<{ __typename?: 'EducationTranslationLocale', locale: string, messages: { __typename?: 'EducationMessages', description: string, title: string } }>, organization: { __typename?: 'Organization', category: string, id: string, logo: string, name: string, slug: string, website: string }, period?: { __typename?: 'DateRangeEntity', from?: any | null, to?: any | null } | null, skills?: Array<{ __typename?: 'Skill', category: string, id: string, name: string, slug: string }> | null }> };

export type FindAllExperiencesQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllExperiencesQuery = { __typename?: 'Query', findAllExperiences: Array<{ __typename?: 'Experience', category: string, id: string, slug: string, organization: { __typename?: 'Organization', category: string, id: string, logo: string, name: string, slug: string, website: string }, roles: Array<{ __typename?: 'ExperienceRole', i18n: Array<{ __typename?: 'ExperienceTranslationLocale', locale: string, messages: { __typename?: 'ExperienceMessages', description: string, title: string } }>, period?: { __typename?: 'DateRangeEntity', from?: any | null, to?: any | null } | null, skills?: Array<{ __typename?: 'Skill', category: string, id: string, name: string, slug: string }> | null }>, skills?: Array<{ __typename?: 'Skill', category: string, id: string, name: string, slug: string }> | null }> };

export type FindAllOrganizationsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllOrganizationsQuery = { __typename?: 'Query', findAllOrganizations: Array<{ __typename?: 'Organization', category: string, id: string, logo: string, name: string, slug: string, website: string }> };

export type FindAllProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllProjectsQuery = { __typename?: 'Query', findAllProjects: Array<{ __typename?: 'Project', id: string, images?: Array<string> | null, slug: string, i18n: Array<{ __typename?: 'ProjectMessagesTranslationEntity', locale: string, messages: { __typename?: 'ProjectMessages', description: string, title: string } }>, skills?: Array<{ __typename?: 'Skill', category: string, id: string, name: string, slug: string }> | null, urls?: Array<{ __typename?: 'UrlEntity', title: string, value: string }> | null }> };

export type FindAllSkillsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllSkillsQuery = { __typename?: 'Query', findAllSkills: Array<{ __typename?: 'Skill', category: string, id: string, name: string, slug: string }> };

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
    query findOneUserById($findOneUserByIdId: ID!) {
  findOneUserById(id: $findOneUserByIdId) {
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
export const FindAllEducationsDocument = new TypedDocumentString(`
    query findAllEducations {
  findAllEducations {
    category
    url
    status
    hours
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
    `) as unknown as TypedDocumentString<FindAllEducationsQuery, FindAllEducationsQueryVariables>;
export const FindAllExperiencesDocument = new TypedDocumentString(`
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
    `) as unknown as TypedDocumentString<FindAllExperiencesQuery, FindAllExperiencesQueryVariables>;
export const FindAllOrganizationsDocument = new TypedDocumentString(`
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
    `) as unknown as TypedDocumentString<FindAllOrganizationsQuery, FindAllOrganizationsQueryVariables>;
export const FindAllProjectsDocument = new TypedDocumentString(`
    query findAllProjects {
  findAllProjects {
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
    `) as unknown as TypedDocumentString<FindAllProjectsQuery, FindAllProjectsQueryVariables>;
export const FindAllSkillsDocument = new TypedDocumentString(`
    query findAllSkills {
  findAllSkills {
    category
    id
    name
    slug
  }
}
    `) as unknown as TypedDocumentString<FindAllSkillsQuery, FindAllSkillsQueryVariables>;