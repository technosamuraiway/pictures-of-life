import { useEffect, useState } from 'react'

import { UsersListTable } from '@/entities/tables/users-list-table/UsersListTable'
import { SortDirection, UserBlockStatus } from '@/services/graphql/codegen/graphql'
import { GET_USERS } from '@/services/graphql/queries/user'
import { useSignInAdminStore } from '@/services/store/signInAdminStore'
import { InitLoader, PATH } from '@/shared'
import { getLayoutWithNav } from '@/widgets'
import { useQuery } from '@apollo/client'
import { Pagination, Select, TextField } from '@technosamurai/techno-ui-kit'
import { useRouter } from 'next/router'

import s from './UsersList.module.scss'

function UsersList() {
  const router = useRouter()
  const { logged } = useSignInAdminStore()
  const [filterByUserStatus, setFilterByUserStatus] = useState<UserBlockStatus>(UserBlockStatus.All)
  const [searchTerm, setSearchTerm] = useState<UserBlockStatus>(UserBlockStatus.All)
  const [currentPage, setCurrentPage] = useState(1)

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
      sortBy: 'createdAt',
      sortDirection: SortDirection.Desc,
      statusFilter: filterByUserStatus,
    },
  })

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
    refetch()
  }

  return (
    <div className={s.container}>
      <div className={s.inputSelectBlock}>
        <TextField placeholder={'Search'} type={'search'} />
        <Select
          currentValue={filterByUserStatus}
          defaultValue={UserBlockStatus.All}
          onValueChange={el => {
            setFilterByUserStatus(el as UserBlockStatus)
          }}
          options={[
            {
              label: 'Not selected',
              value: UserBlockStatus.All,
            },
            {
              label: 'Blocked',
              value: UserBlockStatus.Blocked,
            },
            {
              label: 'Not Blocked',
              value: UserBlockStatus.Unblocked,
            },
          ]}
          selectWidth={'234px'}
        />
      </div>
      <div>{loading ? <InitLoader /> : <UsersListTable users={data?.getUsers?.users ?? []} />}</div>

      <Pagination
        count={data?.getUsers?.pagination?.pagesCount ?? 0}
        onChange={handlePageChange}
        onPageTitle={'asddv'}
        page={currentPage}
        showTitle={'Show'}
      />
    </div>
  )
}

UsersList.getLayout = getLayoutWithNav
export default UsersList
