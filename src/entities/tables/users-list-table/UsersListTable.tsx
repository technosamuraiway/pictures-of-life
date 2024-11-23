import { HeadCell } from '@/entities/tables/paymentsTable/headCell/HeadCell'
import { TableCell } from '@/entities/tables/paymentsTable/tableCell/TableCell'
import { TableCellMoreHorizontalIcon } from '@/entities/tables/users-list-table/tableCellMoreHorizontallIcon/TableCellMoreHorizontalIcon'
import { TableCellUsersList } from '@/entities/tables/users-list-table/tableCellUsersList/TableCellUsersList'
import { User } from '@/services/graphql/codegen/graphql'
import { convertDate, useRouterLocaleDefinition } from '@/shared'
import { BlockedIcon } from '@public/icons/BlockedIcon'
import { Tables, Typography } from '@technosamurai/techno-ui-kit'

import s from './UsersListTable.module.scss'

interface IProps {
  users: User[]
}

export const UsersListTable = ({ users }: IProps) => {
  const t = useRouterLocaleDefinition()

  if (users?.length === 0) {
    return (
      <Typography as={'h1'} className={s.emptyText} variant={'h1'}>
        {'Список пуст'}
      </Typography>
    )
  }

  return (
    <Tables.Table>
      <Tables.TableHead>
        <Tables.TableRow className={s.head}>
          <HeadCell title={'User ID'} />
          <HeadCell title={'Username'} />
          <HeadCell title={'Profile link'} />
          <HeadCell title={'Date added'} />
          <HeadCell title={''} />
        </Tables.TableRow>
      </Tables.TableHead>

      <Tables.TableBody>
        {users?.map(user => (
          <Tables.TableRow key={user.id}>
            <TableCellUsersList icon={user.userBan && <BlockedIcon />} value={user.id} />
            <TableCell value={user.userName} />
            <TableCell value={user.email} />
            <TableCell value={convertDate(user.createdAt)} />
            <TableCellMoreHorizontalIcon />
          </Tables.TableRow>
        ))}
      </Tables.TableBody>
    </Tables.Table>
  )
}
