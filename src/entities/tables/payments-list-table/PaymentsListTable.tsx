import { HeadCell } from '@/entities/tables/paymentsTable/headCell/HeadCell'
import { TableCell } from '@/entities/tables/paymentsTable/tableCell/TableCell'
import { HeadCellWithArrow } from '@/entities/tables/users-list-table/headCellUsersList/HeadCellWithArrow'
import { TableCellUsersList } from '@/entities/tables/users-list-table/tableCellUsersList/TableCellUsersList'
import { SortDirection, SubscriptionPaymentsModel } from '@/services/graphql/codegen/graphql'
import { convertDate, useRouterLocaleDefinition } from '@/shared'
import { SORT_BY_TYPE } from '@/shared/enums'
import { Tables, Typography } from '@technosamurai/techno-ui-kit'

import s from './PaymentsListTable.module.scss'

interface IProps {
  handleSortDirection: (sortDirection: SortDirection, sortBy: SORT_BY_TYPE) => void
  payments: SubscriptionPaymentsModel[]
  refetch: Function
  sortDirection: SortDirection | null
}

export const PaymentsListTable = ({
  handleSortDirection,
  payments,
  refetch,
  sortDirection,
}: IProps) => {
  const t = useRouterLocaleDefinition()

  if (payments?.length === 0) {
    return (
      <Typography as={'h1'} className={s.emptyText} variant={'h1'}>
        {t.admin.usersList.listIsEmpty}
      </Typography>
    )
  }

  return (
    <Tables.Table>
      <Tables.TableHead>
        <Tables.TableRow className={s.head}>
          <HeadCellWithArrow
            handleSortDirection={handleSortDirection}
            sortBy={SORT_BY_TYPE.USERNAME}
            sortDirection={sortDirection}
            title={t.admin.usersList.username}
          />
          <HeadCellWithArrow
            handleSortDirection={handleSortDirection}
            sortBy={SORT_BY_TYPE.CREATEDAT}
            sortDirection={sortDirection}
            title={t.admin.paymentsList.dateAdded}
          />
          <HeadCellWithArrow
            handleSortDirection={handleSortDirection}
            sortBy={SORT_BY_TYPE.CREATEDAT}
            sortDirection={sortDirection}
            title={t.admin.paymentsList.amount}
          />
          <HeadCell title={t.admin.paymentsList.subscription} />
          <HeadCellWithArrow
            handleSortDirection={handleSortDirection}
            sortBy={SORT_BY_TYPE.CREATEDAT}
            sortDirection={sortDirection}
            title={t.admin.paymentsList.paymentMethod}
          />
        </Tables.TableRow>
      </Tables.TableHead>

      <Tables.TableBody>
        {payments?.map(payment => (
          <Tables.TableRow key={payment.id}>
            <TableCellUsersList
              icon={
                <img alt={'Avatar'} className={s.avatar} src={payment.avatars?.[0]?.url ?? ''} />
              }
              value={payment.userName}
            />
            <TableCell value={convertDate(payment.createdAt)} />
            <TableCell value={payment.amount ?? 0} />
            <TableCell value={convertDate(payment.endDate)} />
            <TableCell value={payment.paymentMethod} />
          </Tables.TableRow>
        ))}
      </Tables.TableBody>
    </Tables.Table>
  )
}
