import { graphql } from '@/services/graphql/codegen/index'

export const GET_USERS = graphql(`
  query GetUsers(
    $pageSize: Int
    $pageNumber: Int
    $sortBy: String = "createdAt"
    $sortDirection: SortDirection = desc
    $searchTerm: String
    $statusFilter: UserBlockStatus = ALL
  ) {
    getUsers(
      pageSize: $pageSize
      pageNumber: $pageNumber
      sortBy: $sortBy
      sortDirection: $sortDirection
      searchTerm: $searchTerm
      statusFilter: $statusFilter
    ) {
      users {
        id
        userName
        email
        createdAt
        profile {
          id
          userName
          firstName
          lastName
          city
          country
          region
          dateOfBirth
          aboutMe
          createdAt
          avatars {
            url
            width
            height
            fileSize
          }
        }
        userBan {
          reason
          createdAt
        }
      }
      pagination {
        pagesCount
        page
        pageSize
        totalCount
      }
    }
  }
`)
