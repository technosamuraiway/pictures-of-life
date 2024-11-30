import { useState } from 'react'

import { SortDirection } from '@/services/graphql/codegen/graphql'
import { useGetUserIdFromParams, useRouterLocaleDefinition } from '@/shared'

const PER_PAGE = [5, 10, 20]

export const usePaginationAndSortDirection = () => {
  const t = useRouterLocaleDefinition()

  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState('createdAt')
  const [currentPerPage, setCurrentPerPage] = useState(PER_PAGE[0])
  const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection.Desc)
  const { userId } = useGetUserIdFromParams()

  return {
    PER_PAGE,
    currentPage,
    currentPerPage,
    setCurrentPage,
    setCurrentPerPage,
    setSortBy,
    setSortDirection,
    sortBy,
    sortDirection,
    t,
    userId,
  }
}
