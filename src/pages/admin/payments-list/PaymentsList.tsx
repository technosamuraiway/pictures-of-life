import React, { useEffect, useRef, useState } from 'react'

import { PaymentsListTable } from '@/entities/tables/payments-list-table/PaymentsListTable'
import { SortDirection } from '@/services/graphql/codegen/graphql'
import { GET_PAYMENTS } from '@/services/graphql/queries/paymets'
import { useSignInAdminStore } from '@/services/store/signInAdminStore'
import { InitLoader, PATH, useRouterLocaleDefinition } from '@/shared'
import { SORT_BY_TYPE } from '@/shared/enums'
import { getLayoutWithNav } from '@/widgets'
import { useQuery } from '@apollo/client'
import { Checkbox, Pagination, TextField } from '@technosamurai/techno-ui-kit'
import { useRouter } from 'next/router'

import s from './PaymentsList.module.scss'

function PaymentsList() {
  const t = useRouterLocaleDefinition()
  const router = useRouter()
  const { logged } = useSignInAdminStore()
  const [sortBy, setSortBy] = useState<'' | SORT_BY_TYPE>('')
  const [sortDirection, setSortDirection] = useState<SortDirection | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [autoUpdate, setAutoUpdate] = useState(false)
  // eslint-disable-next-line no-undef
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Проверка верификации администратора
    if (!logged) {
      // Перенаправление на страницу входа для администраторов
      router.replace(PATH.AUTH.SIGNINADMIN)
    }
  }, [router, logged])

  const { data, loading, refetch } = useQuery(GET_PAYMENTS, {
    pollInterval: autoUpdate ? 5000 : 0,
    variables: {
      pageNumber: currentPage,
      pageSize: 10,
      searchTerm,
      sortBy,
      sortDirection,
    },
  })

  const toggleAutoUpdate = () => {
    setAutoUpdate(prev => !prev)
  }

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
        <Checkbox
          checked={autoUpdate}
          label={t.admin.paymentsList.autoUpdate}
          onCheckedChange={toggleAutoUpdate}
        />
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
          <PaymentsListTable
            handleSortDirection={handleSortDirection}
            payments={data?.getPayments?.items ?? []}
            sortBy={sortBy as SORT_BY_TYPE}
            sortDirection={sortDirection}
          />
        )}
      </div>
      {!loading && (
        <Pagination
          count={data?.getPayments?.pagesCount ?? 0}
          onChange={handlePageChange}
          onPageTitle={t.pagination.onPage}
          onPerPageChange={() => {}}
          page={currentPage}
          perPage={5}
          perPageOptions={[5, 10, 20]}
          showTitle={t.pagination.show}
        />
      )}
    </div>
  )
}

PaymentsList.getLayout = getLayoutWithNav
export default PaymentsList
