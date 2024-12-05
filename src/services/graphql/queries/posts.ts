import { graphql } from '@/services/graphql/codegen/index'

export const GET_POSTS = graphql(`
  query GetPosts(
    $endCursorPostId: Int
    $searchTerm: String
    $pageSize: Int = 10
    $sortBy: String = "createdAt"
    $sortDirection: SortDirection = desc
  ) {
    getPosts(
      endCursorPostId: $endCursorPostId
      searchTerm: $searchTerm
      pageSize: $pageSize
      sortBy: $sortBy
      sortDirection: $sortDirection
    ) {
      pagesCount
      pageSize
      totalCount
      items {
        id
        createdAt
        images {
          id
          createdAt
          url
          fileSize
          width
          height
        }
      }
    }
  }
`)

export const GET_POSTS_LIST = graphql(`
  query GetPostsList(
    $endCursorPostId: Int
    $searchTerm: String
    $pageSize: Int = 10
    $sortBy: String = "createdAt"
    $sortDirection: SortDirection = desc
  ) {
    getPosts(
      endCursorPostId: $endCursorPostId
      searchTerm: $searchTerm
      pageSize: $pageSize
      sortBy: $sortBy
      sortDirection: $sortDirection
    ) {
      items {
        id
        description
        createdAt
        postOwner {
          userName
          id
          avatars {
            url
          }
        }
        images {
          id
          url
        }
      }
    }
  }
`)
