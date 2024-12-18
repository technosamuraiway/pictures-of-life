import { PaymentsTable } from '@/entities'
import { useGetSubscriptionQuery } from '@/services'
import { useRouterLocaleDefinition } from '@/shared'
import { Tabs } from '@technosamurai/techno-ui-kit'
import { useRouter } from 'next/router'

interface IProps {
  value: string
}

export const Payments = ({ value }: IProps) => {
  const t = useRouterLocaleDefinition()

  const { asPath } = useRouter()
  const { data: paymentsData, isLoading: paymentsIsLoading } = useGetSubscriptionQuery(undefined, {
    pollingInterval: asPath.includes('payments') ? 5000 : undefined,
  })

  return (
    <Tabs.Content value={value}>
      <PaymentsTable
        emptyTableText={t.settingsPage.payments.emptyList}
        isLoading={paymentsIsLoading}
        tableData={paymentsData}
      />
    </Tabs.Content>
  )
}
