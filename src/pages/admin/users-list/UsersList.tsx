import { useEffect, useState } from 'react'

import { UserBlockStatus } from '@/services/graphql/codegen/graphql'
import { useSignInAdminStore } from '@/services/store/signInAdminStore'
import { PATH } from '@/shared'
import { getLayoutWithNav } from '@/widgets'
import { UsersListTable } from '@/widgets/admin/users-list/users-list-table/UsersListTable'
import { Select, TextField } from '@technosamurai/techno-ui-kit'
import { useRouter } from 'next/router'

import s from './UsersList.module.scss'

function UsersList() {
  const router = useRouter()
  const { logged } = useSignInAdminStore()
  const [filterByUserStatus, setFilterByUserStatus] = useState<UserBlockStatus>(UserBlockStatus.All)

  useEffect(() => {
    // Проверка верификации администратора
    if (!logged) {
      // Перенаправление на страницу входа для администраторов
      router.replace(PATH.AUTH.SIGNINADMIN)
    }
  }, [router, logged])

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
      <div>
        <UsersListTable />
      </div>
    </div>
  )
}

UsersList.getLayout = getLayoutWithNav
export default UsersList
