import { graphql } from '@/services/graphql/codegen/index'

export const GET_PAYMENTS = graphql(`
  query GetPayments(
    $pageSize: Int
    $pageNumber: Int
    $sortBy: String = "createdAt"
    $sortDirection: SortDirection = desc
    $searchTerm: String
  ) {
    getPayments(
      pageSize: $pageSize
      pageNumber: $pageNumber
      sortBy: $sortBy
      sortDirection: $sortDirection
      searchTerm: $searchTerm
    ) {
      pagesCount
      page
      pageSize
      totalCount
      items {
        id
        userId
        paymentMethod
        amount
        currency
        createdAt
        endDate
        type
        userName
        avatars {
          url
          width
          height
          fileSize
        }
      }
    }
  }
`)
