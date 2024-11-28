import { useState } from 'react'

import { FollowTable } from '@/entities'
import { FollowUser, useRouterLocaleDefinition } from '@/shared'
import { Pagination, Tabs } from '@technosamurai/techno-ui-kit'

interface IProps {
  value: string
}

const TOTAL_PAGES_COUNT = 4
const PER_PAGE = [5, 10, 250]
const data: FollowUser[] = [
  { createdAt: '2024-11-28T00:00:00Z', id: 576, userId: 1487, userName: 'Stiфыch' },
  { createdAt: '2024-11-28T00:00:00Z', id: 586, userId: 1474, userName: 'Stich' },
  { createdAt: '2024-11-28T00:00:00Z', id: 596, userId: 1412, userName: 'Sticфывh' },
  { createdAt: '2024-11-28T00:00:00Z', id: 536, userId: 1512, userName: 'Stiыфвввch' },
  { createdAt: '2024-11-28T00:00:00Z', id: 546, userId: 1812, userName: 'Stiфывch' },
]

export const Followers = ({ value }: IProps) => {
  const t = useRouterLocaleDefinition()
  const [currentPage, setCurrentPage] = useState(1)
  const [currentPerPage, setCurrentPerPage] = useState(PER_PAGE[0])

  return (
    <Tabs.Content value={value}>
      <FollowTable
        emptyTableText={t.admin.userList.tabs.followers.emptyTable}
        sortDirection={'asc'}
        tableData={data}
      />
      {data.length > 4 && (
        <Pagination
          count={TOTAL_PAGES_COUNT}
          onChange={setCurrentPage}
          onPageTitle={t.pagination.onPage}
          onPerPageChange={setCurrentPerPage}
          page={currentPage}
          perPage={currentPerPage}
          perPageOptions={PER_PAGE}
          showTitle={t.pagination.show}
        />
      )}
    </Tabs.Content>
  )
}
