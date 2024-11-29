import React, { useEffect, useRef, useState } from 'react'

import { UsersListTable } from '@/entities/tables/users-list-table/UsersListTable'
import { SortDirection, UserBlockStatus } from '@/services/graphql/codegen/graphql'
import { GET_USERS } from '@/services/graphql/queries/user'
import { useSignInAdminStore } from '@/services/store/signInAdminStore'
import { InitLoader, PATH, useRouterLocaleDefinition } from '@/shared'
import { SORT_BY_TYPE } from '@/shared/enums'
import { getLayoutWithNav } from '@/widgets'
import { useQuery } from '@apollo/client'
import { Checkbox, Pagination, Select, TextField } from '@technosamurai/techno-ui-kit'
import { useRouter } from 'next/router'

import s from './PaymentsList.module.scss'

function PaymentsList() {
  const t = useRouterLocaleDefinition()
  const router = useRouter()
  const { logged } = useSignInAdminStore()
  const [filterByUserStatus, setFilterByUserStatus] = useState<UserBlockStatus>(UserBlockStatus.All)
  const [sortBy, setSortBy] = useState<'' | SORT_BY_TYPE>('')
  const [sortDirection, setSortDirection] = useState<SortDirection | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  // eslint-disable-next-line no-undef
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null)

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
      pageSize: 10,
      searchTerm,
      sortBy: sortBy,
      sortDirection: sortDirection,
      statusFilter: filterByUserStatus,
    },
  })
  const handleSortDirection = (sortDirection: SortDirection, sortBy: SORT_BY_TYPE) => {
    setSortBy(sortBy)
    setSortDirection(sortDirection)
  }
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
    refetch()
  }

  // Дебаунс для поиска
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    setSearchTerm(value)

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current)
    }

    debounceTimeout.current = setTimeout(() => {
      refetch() // Выполнить запрос после дебаунса
    }, 1000) // Задержка в 300 мс
  }

  return (
    <div className={s.container}>
      <div className={s.checkboxWrapper}>
        <Checkbox checked label={'Autoupdate'} onCheckedChange={() => {}} />
      </div>
      <div className={s.inputSelectBlock}>
        <TextField
          onChange={handleSearchChange} // Обработчик изменения поля ввода
          placeholder={t.admin.usersList.search}
          type={'search'}
        />
      </div>
      <div>
        {loading ? (
          <InitLoader />
        ) : (
          <UsersListTable
            handleSortDirection={handleSortDirection}
            refetch={refetch}
            sortDirection={sortDirection}
            users={data?.getUsers?.users ?? []}
          />
        )}
      </div>
      {!loading && (
        <Pagination
          count={data?.getUsers?.pagination?.pagesCount ?? 0}
          onChange={handlePageChange}
          onPageTitle={''}
          page={currentPage}
          showTitle={'Show'}
        />
      )}
    </div>
  )
}

PaymentsList.getLayout = getLayoutWithNav
export default PaymentsList
