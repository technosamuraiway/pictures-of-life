import { IMyPaymentsResponse } from '@/services'
import {
  BodyTableCell,
  HeadTableCell,
  InitLoader,
  convertDate,
  useRouterLocaleDefinition,
} from '@/shared'
import { Tables, Typography } from '@technosamurai/techno-ui-kit'

interface IProps {
  emptyTableText?: string
  isLoading?: boolean
  tableData?: IMyPaymentsResponse[]
}

export const PaymentsTable = ({ emptyTableText, isLoading, tableData }: IProps) => {
  const t = useRouterLocaleDefinition()

  if (tableData?.length === 0) {
    return (
      <Typography as={'h1'} style={{ textAlign: 'center' }} variant={'h1'}>
        {emptyTableText}
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
            <Tables.TableRow>
              <HeadTableCell title={t.settingsPage.payments.dateOfPayment} />
              <HeadTableCell title={t.settingsPage.payments.endDateOfSubscription} />
              <HeadTableCell title={`${t.settingsPage.payments.price}, $`} />
              <HeadTableCell title={t.settingsPage.payments.subscriptionType} />
              <HeadTableCell title={t.settingsPage.payments.paymentType} />
            </Tables.TableRow>
          </Tables.TableHead>

          <Tables.TableBody>
            {tableData?.map(el => (
              <Tables.TableRow key={el.subscriptionId}>
                <BodyTableCell value={convertDate(el.dateOfPayment)} />
                <BodyTableCell value={convertDate(el.endDateOfSubscription)} />
                <BodyTableCell value={`$${el.price}`} />
                <BodyTableCell value={el.subscriptionType} />
                <BodyTableCell value={el.paymentType} />
              </Tables.TableRow>
            ))}
          </Tables.TableBody>
        </Tables.Table>
      )}
    </>
  )
}
