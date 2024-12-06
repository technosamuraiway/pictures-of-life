import React, { useCallback, useEffect, useState } from 'react'

import { UsersListTable } from '@/entities/tables/users-list-table/UsersListTable'
import { SortDirection, UserBlockStatus } from '@/services/graphql/codegen/graphql'
import { GET_USERS } from '@/services/graphql/queries/user'
import { useSignInAdminStore } from '@/services/store/signInAdminStore'
import { InitLoader, PATH, useRouterLocaleDefinition } from '@/shared'
import { SORT_BY_TYPE } from '@/shared/enums'
import { getLayoutWithNav } from '@/widgets'
import { useQuery } from '@apollo/client'
import { Pagination, Select, TextField } from '@technosamurai/techno-ui-kit'
import { debounce } from 'lodash'
import { useRouter } from 'next/router'

import s from './UsersList.module.scss'

function UsersList() {
  const t = useRouterLocaleDefinition()
  const router = useRouter()
  const { logged } = useSignInAdminStore()
  const [filterByUserStatus, setFilterByUserStatus] = useState<UserBlockStatus>(UserBlockStatus.All)
  const [sortBy, setSortBy] = useState<'' | SORT_BY_TYPE>('')
  const [sortDirection, setSortDirection] = useState<SortDirection | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState<number>(10)

  useEffect(() => {
    // Проверка верификации администратора
    if (!logged) {
      // Перенаправление на страницу входа для администраторов
      router.replace(PATH.AUTH.SIGNINADMIN)
    }
  }, [router, logged])

  const { data, loading, refetch } = useQuery(GET_USERS, {
    variables: {
      pageNumber: currentPage,
      pageSize: perPage,
      sortBy,
      sortDirection,
      statusFilter: filterByUserStatus,
    },
  })
  const handleSortDirection = (newSortDirection: SortDirection, newSortBy: SORT_BY_TYPE) => {
    setSortBy(newSortBy)
    setSortDirection(newSortDirection)
    refetch()
  }
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
    refetch()
  }

  // Дебаунс для поиска
  const handleSearchRefetch = (newSearchTerm: string) => {
    refetch({ searchTerm: newSearchTerm })
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceFn = useCallback(debounce(handleSearchRefetch, 1000), [])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event?.target?.value)
  }

  useEffect(() => {
    debounceFn(searchTerm)

    return () => debounceFn.cancel()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm])

  return (
    <div className={s.container}>
      <div className={s.inputSelectBlock}>
        <TextField
          onChange={handleSearchChange}
          placeholder={t.admin.usersList.search}
          type={'search'}
          value={searchTerm}
        />
        <Select
          currentValue={filterByUserStatus}
          defaultValue={UserBlockStatus.All}
          onValueChange={el => {
            setFilterByUserStatus(el as UserBlockStatus)
            refetch()
          }}
          options={[
            {
              label: t.admin.usersList.notSelected,
              value: UserBlockStatus.All,
            },
            {
              label: t.admin.usersList.blocked,
              value: UserBlockStatus.Blocked,
            },
            {
              label: t.admin.usersList.notBlocked,
              value: UserBlockStatus.Unblocked,
            },
          ]}
          selectWidth={'250px'}
        />
      </div>
      <div>
        {loading ? (
          <InitLoader />
        ) : (
          <UsersListTable
            handleSortDirection={handleSortDirection}
            refetch={refetch}
            sortBy={sortBy as SORT_BY_TYPE}
            sortDirection={sortDirection}
            users={data?.getUsers?.users ?? []}
          />
        )}
      </div>
      {!loading && (
        <Pagination
          count={data?.getUsers?.pagination?.pagesCount ?? 0}
          onChange={handlePageChange}
          onPageTitle={t.pagination.onPage}
          onPerPageChange={(itemPerPage: number) => {
            setPerPage(Number(itemPerPage))
          }}
          page={currentPage}
          perPage={perPage}
          perPageOptions={[5, 10, 20]}
          showTitle={t.pagination.show}
        />
      )}
    </div>
  )
}

UsersList.getLayout = getLayoutWithNav
export default UsersList
