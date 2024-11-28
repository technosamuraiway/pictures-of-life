/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

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
const documents = {
    "\n  mutation LoginAdmin($email: String!, $password: String!) {\n    loginAdmin(email: $email, password: $password) {\n      logged\n    }\n  }\n": types.LoginAdminDocument,
    "\n  mutation RemoveUser($userId: Int!) {\n    removeUser(userId: $userId)\n  }\n": types.RemoveUserDocument,
    "\n  query GetPayments(\n    $pageSize: Int\n    $pageNumber: Int\n    $sortBy: String = \"createdAt\"\n    $sortDirection: SortDirection = desc\n    $searchTerm: String\n  ) {\n    getPayments(\n      pageSize: $pageSize\n      pageNumber: $pageNumber\n      sortBy: $sortBy\n      sortDirection: $sortDirection\n      searchTerm: $searchTerm\n    ) {\n      pagesCount\n      page\n      pageSize\n      totalCount\n      items {\n        id\n        userId\n        paymentMethod\n        amount\n        currency\n        createdAt\n        endDate\n        type\n        userName\n        avatars {\n          url\n          width\n          height\n          fileSize\n        }\n      }\n    }\n  }\n": types.GetPaymentsDocument,
    "\n  query GetPosts(\n    $endCursorPostId: Int\n    $searchTerm: String\n    $pageSize: Int = 10\n    $sortBy: String = \"createdAt\"\n    $sortDirection: SortDirection = desc\n  ) {\n    getPosts(\n      endCursorPostId: $endCursorPostId\n      searchTerm: $searchTerm\n      pageSize: $pageSize\n      sortBy: $sortBy\n      sortDirection: $sortDirection\n    ) {\n      pagesCount\n      pageSize\n      totalCount\n      items {\n        id\n        createdAt\n        images {\n          id\n          createdAt\n          url\n          fileSize\n          width\n          height\n        }\n      }\n    }\n  }\n": types.GetPostsDocument,
    "\n  query GetUsers(\n    $pageSize: Int\n    $pageNumber: Int\n    $sortBy: String = \"createdAt\"\n    $sortDirection: SortDirection = desc\n    $searchTerm: String\n    $statusFilter: UserBlockStatus = ALL\n  ) {\n    getUsers(\n      pageSize: $pageSize\n      pageNumber: $pageNumber\n      sortBy: $sortBy\n      sortDirection: $sortDirection\n      searchTerm: $searchTerm\n      statusFilter: $statusFilter\n    ) {\n      users {\n        id\n        userName\n        email\n        createdAt\n        profile {\n          id\n          userName\n          firstName\n          lastName\n          city\n          country\n          region\n          dateOfBirth\n          aboutMe\n          createdAt\n          avatars {\n            url\n            width\n            height\n            fileSize\n          }\n        }\n        userBan {\n          reason\n          createdAt\n        }\n      }\n      pagination {\n        pagesCount\n        page\n        pageSize\n        totalCount\n      }\n    }\n  }\n": types.GetUsersDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation LoginAdmin($email: String!, $password: String!) {\n    loginAdmin(email: $email, password: $password) {\n      logged\n    }\n  }\n"): (typeof documents)["\n  mutation LoginAdmin($email: String!, $password: String!) {\n    loginAdmin(email: $email, password: $password) {\n      logged\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveUser($userId: Int!) {\n    removeUser(userId: $userId)\n  }\n"): (typeof documents)["\n  mutation RemoveUser($userId: Int!) {\n    removeUser(userId: $userId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPayments(\n    $pageSize: Int\n    $pageNumber: Int\n    $sortBy: String = \"createdAt\"\n    $sortDirection: SortDirection = desc\n    $searchTerm: String\n  ) {\n    getPayments(\n      pageSize: $pageSize\n      pageNumber: $pageNumber\n      sortBy: $sortBy\n      sortDirection: $sortDirection\n      searchTerm: $searchTerm\n    ) {\n      pagesCount\n      page\n      pageSize\n      totalCount\n      items {\n        id\n        userId\n        paymentMethod\n        amount\n        currency\n        createdAt\n        endDate\n        type\n        userName\n        avatars {\n          url\n          width\n          height\n          fileSize\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPayments(\n    $pageSize: Int\n    $pageNumber: Int\n    $sortBy: String = \"createdAt\"\n    $sortDirection: SortDirection = desc\n    $searchTerm: String\n  ) {\n    getPayments(\n      pageSize: $pageSize\n      pageNumber: $pageNumber\n      sortBy: $sortBy\n      sortDirection: $sortDirection\n      searchTerm: $searchTerm\n    ) {\n      pagesCount\n      page\n      pageSize\n      totalCount\n      items {\n        id\n        userId\n        paymentMethod\n        amount\n        currency\n        createdAt\n        endDate\n        type\n        userName\n        avatars {\n          url\n          width\n          height\n          fileSize\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPosts(\n    $endCursorPostId: Int\n    $searchTerm: String\n    $pageSize: Int = 10\n    $sortBy: String = \"createdAt\"\n    $sortDirection: SortDirection = desc\n  ) {\n    getPosts(\n      endCursorPostId: $endCursorPostId\n      searchTerm: $searchTerm\n      pageSize: $pageSize\n      sortBy: $sortBy\n      sortDirection: $sortDirection\n    ) {\n      pagesCount\n      pageSize\n      totalCount\n      items {\n        id\n        createdAt\n        images {\n          id\n          createdAt\n          url\n          fileSize\n          width\n          height\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPosts(\n    $endCursorPostId: Int\n    $searchTerm: String\n    $pageSize: Int = 10\n    $sortBy: String = \"createdAt\"\n    $sortDirection: SortDirection = desc\n  ) {\n    getPosts(\n      endCursorPostId: $endCursorPostId\n      searchTerm: $searchTerm\n      pageSize: $pageSize\n      sortBy: $sortBy\n      sortDirection: $sortDirection\n    ) {\n      pagesCount\n      pageSize\n      totalCount\n      items {\n        id\n        createdAt\n        images {\n          id\n          createdAt\n          url\n          fileSize\n          width\n          height\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUsers(\n    $pageSize: Int\n    $pageNumber: Int\n    $sortBy: String = \"createdAt\"\n    $sortDirection: SortDirection = desc\n    $searchTerm: String\n    $statusFilter: UserBlockStatus = ALL\n  ) {\n    getUsers(\n      pageSize: $pageSize\n      pageNumber: $pageNumber\n      sortBy: $sortBy\n      sortDirection: $sortDirection\n      searchTerm: $searchTerm\n      statusFilter: $statusFilter\n    ) {\n      users {\n        id\n        userName\n        email\n        createdAt\n        profile {\n          id\n          userName\n          firstName\n          lastName\n          city\n          country\n          region\n          dateOfBirth\n          aboutMe\n          createdAt\n          avatars {\n            url\n            width\n            height\n            fileSize\n          }\n        }\n        userBan {\n          reason\n          createdAt\n        }\n      }\n      pagination {\n        pagesCount\n        page\n        pageSize\n        totalCount\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetUsers(\n    $pageSize: Int\n    $pageNumber: Int\n    $sortBy: String = \"createdAt\"\n    $sortDirection: SortDirection = desc\n    $searchTerm: String\n    $statusFilter: UserBlockStatus = ALL\n  ) {\n    getUsers(\n      pageSize: $pageSize\n      pageNumber: $pageNumber\n      sortBy: $sortBy\n      sortDirection: $sortDirection\n      searchTerm: $searchTerm\n      statusFilter: $statusFilter\n    ) {\n      users {\n        id\n        userName\n        email\n        createdAt\n        profile {\n          id\n          userName\n          firstName\n          lastName\n          city\n          country\n          region\n          dateOfBirth\n          aboutMe\n          createdAt\n          avatars {\n            url\n            width\n            height\n            fileSize\n          }\n        }\n        userBan {\n          reason\n          createdAt\n        }\n      }\n      pagination {\n        pagesCount\n        page\n        pageSize\n        totalCount\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;