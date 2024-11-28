import React, { useState } from 'react'

import { FollowingTable } from '@/entities'
import { useRouterLocaleDefinition } from '@/shared'
import { Pagination, Tabs } from '@technosamurai/techno-ui-kit'

import s from './Following.module.scss'

interface IProps {
  value: string
}

const TOTAL_PAGES_COUNT = 7
const PER_PAGE = [5, 10, 250]

export const Following = ({ value }: IProps) => {
  const t = useRouterLocaleDefinition()
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(PER_PAGE[0])

  return (
    <Tabs.Content value={value}>
      <FollowingTable />
      <Pagination
        count={TOTAL_PAGES_COUNT}
        onChange={setPage}
        onPageTitle={t.pagination.onPage}
        onPerPageChange={setPerPage}
        page={page}
        perPage={perPage}
        perPageOptions={PER_PAGE}
        showTitle={t.pagination.show}
      />
    </Tabs.Content>
  )
}
