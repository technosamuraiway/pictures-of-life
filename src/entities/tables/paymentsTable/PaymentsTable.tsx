import { convertDate, useRouterLocaleDefinition } from '@/shared'
import { Typography } from '@technosamurai/techno-ui-kit'

import s from './PaymentsTable.module.scss'

import { HeadCell } from './headCell/HeadCell'
import { TableCell } from './tableCell/TableCell'

interface IPayments {
  dateOfPayment: string
  endDateOfSubscription: string
  paymentType: string
  price: number
  subscriptionId: string
  subscriptionType: string
  userId: number
}

const tableData: IPayments[] = [
  {
    dateOfPayment: '2024-11-04T06:29:58.193Z',
    endDateOfSubscription: '2024-12-04T06:29:58.193Z',
    paymentType: 'STRIPE',
    price: 25,
    subscriptionId: '12343',
    subscriptionType: 'MONTHLY',
    userId: 1480,
  },
  {
    dateOfPayment: '2025-11-04T06:29:58.193Z',
    endDateOfSubscription: '2027-12-04T06:29:58.193Z',
    paymentType: 'PayPal',
    price: 13,
    subscriptionId: '65879',
    subscriptionType: 'Evenly',
    userId: 1480,
  },
]

export const PaymentsTable = () => {
  const t = useRouterLocaleDefinition()

  if (!tableData || tableData.length === 0) {
    return (
      <Typography as={'h1'} className={s.emptyText} variant={'h1'}>
        {t.settingsPage.payments.emptyList}
      </Typography>
    )
  }

  return (
    <Tables.Table>
      <Tables.TableHead>
        <Tables.TableRow>
          <HeadCell title={t.settingsPage.payments.dateOfPayment} />
          <HeadCell title={t.settingsPage.payments.endDateOfSubscription} />
          <HeadCell title={t.settingsPage.payments.price} />
          <HeadCell title={t.settingsPage.payments.subscriptionType} />
          <HeadCell title={t.settingsPage.payments.paymentType} />
        </Tables.TableRow>
      </Tables.TableHead>

      <Tables.TableBody>
        {tableData.map(el => (
          <Tables.TableRow key={el.subscriptionId}>
            <TableCell value={convertDate(el.dateOfPayment)} />
            <TableCell value={convertDate(el.endDateOfSubscription)} />
            <TableCell value={`$${el.price}`} />
            <TableCell value={el.subscriptionType} />
            <TableCell value={el.paymentType} />
          </Tables.TableRow>
        ))}
      </Tables.TableBody>
    </Tables.Table>
  )
}
