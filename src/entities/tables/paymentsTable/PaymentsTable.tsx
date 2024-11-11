import { useGetSubscriptionQuery } from '@/services'
import { InitLoader, convertDate, useRouterLocaleDefinition } from '@/shared'
import { Tables, Typography } from '@technosamurai/techno-ui-kit'

import s from './PaymentsTable.module.scss'

import { HeadCell } from './headCell/HeadCell'
import { TableCell } from './tableCell/TableCell'

export const PaymentsTable = () => {
  const t = useRouterLocaleDefinition()

  const { data: paymentsData, isLoading } = useGetSubscriptionQuery()

  if (paymentsData?.length === 0) {
    return (
      <Typography as={'h1'} className={s.emptyText} variant={'h1'}>
        {t.settingsPage.payments.emptyList}
      </Typography>
    )
  }

  return (
    <>
      {isLoading ? (
        <InitLoader />
      ) : (
        <Tables.Table>
          <Tables.TableHead>
            <Tables.TableRow className={s.head}>
              <HeadCell title={t.settingsPage.payments.dateOfPayment} />
              <HeadCell title={t.settingsPage.payments.endDateOfSubscription} />
              <HeadCell title={t.settingsPage.payments.price} />
              <HeadCell title={t.settingsPage.payments.subscriptionType} />
              <HeadCell title={t.settingsPage.payments.paymentType} />
            </Tables.TableRow>
          </Tables.TableHead>

          <Tables.TableBody>
            {paymentsData?.map(el => (
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
      )}
    </>
  )
}
