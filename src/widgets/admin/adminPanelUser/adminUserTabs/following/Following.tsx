import { useState } from 'react'

import { FollowTable } from '@/entities'
import { SortDirection } from '@/services/graphql/codegen/graphql'
import { GET_USER_FOLLOWING } from '@/services/graphql/queries/user'
import {
  FollowUser,
  RequestLineLoader,
  TablesPagination,
  useRouterLocaleDefinition,
} from '@/shared'
import { useQuery } from '@apollo/client'
import { Tabs } from '@technosamurai/techno-ui-kit'
import { useRouter } from 'next/router'

interface IProps {
  value: string
}

const PER_PAGE = [5, 10, 20]

const dataMy: FollowUser[] = [
  { createdAt: '2024-11-28T00:00:00Z', id: 576, userId: 1487, userName: 'Stiфыch' },
  { createdAt: '2024-11-28T00:00:00Z', id: 586, userId: 1474, userName: 'Stich' },
  { createdAt: '2024-11-28T00:00:00Z', id: 596, userId: 1412, userName: 'Sticфывh' },
  { createdAt: '2024-11-28T00:00:00Z', id: 536, userId: 1512, userName: 'Stiыфвввch' },
  { createdAt: '2024-11-28T00:00:00Z', id: 546, userId: 1812, userName: 'Stiфывch' },
]

export const Following = ({ value }: IProps) => {
  const t = useRouterLocaleDefinition()
  const [currentPage, setCurrentPage] = useState(1)
  const [currentPerPage, setCurrentPerPage] = useState(PER_PAGE[0])

  const { query } = useRouter()

  const { data, loading, refetch } = useQuery(GET_USER_FOLLOWING, {
    variables: {
      pageNumber: currentPage,
      pageSize: Number(currentPerPage),
      sortBy: 'createdAt',
      sortDirection: SortDirection.Desc,
      userId: Number(283),
    },
  })

  const shouldShowPagination = data && data?.getFollowing?.totalCount > 4
  const pageCountDecider = data?.getFollowing?.pagesCount || 5

  return (
    <>
      {loading && <RequestLineLoader />}
      <Tabs.Content value={value}>
        <FollowTable
          emptyTableText={t.admin.userList.tabs.following.emptyTable}
          sortDirection={'desc'}
          tableData={dataMy}
        />
        <TablesPagination
          currentPage={currentPage}
          currentPerPage={currentPerPage}
          data={data}
          isLoading={loading}
          isShowPagination={shouldShowPagination}
          pageCount={pageCountDecider}
          perPage={PER_PAGE}
          refetch={refetch}
          setCurrentPage={setCurrentPage}
          setCurrentPerPage={setCurrentPerPage}
        />
      </Tabs.Content>
    </>
  )
}
