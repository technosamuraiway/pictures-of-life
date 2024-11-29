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

export const GET_USER_FOLLOWING = graphql(`
  query GetUserFollowing(
    $pageSize: Int = 1
    $pageNumber: Int = 1
    $sortBy: String = "createdAt"
    $sortDirection: SortDirection = desc
    $userId: Int!
  ) {
    getFollowing(
      pageSize: $pageSize
      pageNumber: $pageNumber
      sortBy: $sortBy
      sortDirection: $sortDirection
      userId: $userId
    ) {
      pagesCount
      page
      pageSize
      totalCount
      items {
        id
        userId
        userName
        createdAt
      }
    }
  }
`)

export const GET_USER_FOLLOWERS = graphql(`
  query GetUserFollowers(
    $pageSize: Int = 1
    $pageNumber: Int = 1
    $sortBy: String = "createdAt"
    $sortDirection: SortDirection = desc
    $userId: Int!
  ) {
    getFollowers(
      pageSize: $pageSize
      pageNumber: $pageNumber
      sortBy: $sortBy
      sortDirection: $sortDirection
      userId: $userId
    ) {
      pagesCount
      page
      pageSize
      totalCount
      items {
        id
        userId
        userName
        createdAt
      }
    }
  }
`)

export const GET_USER_PAYMENTS = graphql(`
  query GetUserPayments(
    $pageSize: Int = 1
    $pageNumber: Int = 1
    $sortBy: String = "createdAt"
    $sortDirection: SortDirection = desc
    $userId: Int!
  ) {
    getPaymentsByUser(
      pageSize: $pageSize
      pageNumber: $pageNumber
      sortBy: $sortBy
      sortDirection: $sortDirection
      userId: $userId
    ) {
      pagesCount
      page
      pageSize
      totalCount
      items {
        dateOfPayment
        businessAccountId
        id
        endDate
        paymentType
        type
        price
      }
    }
  }
`)

export const GET_USER_POSTS_IMAGES = graphql(`
  query GetUserPostsImages($endCursorId: Int, $userId: Int!) {
    getPostsByUser(endCursorId: $endCursorId, userId: $userId) {
      pagesCount
      pageSize
      totalCount
      items {
        url
        id
      }
    }
  }
`)
