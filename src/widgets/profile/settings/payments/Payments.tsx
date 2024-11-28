import { PaymentsTable } from '@/entities'
import { useGetSubscriptionQuery } from '@/services'
import { useRouterLocaleDefinition } from '@/shared'
import { Tabs } from '@technosamurai/techno-ui-kit'

interface IProps {
  value: string
}

export const Payments = ({ value }: IProps) => {
  const t = useRouterLocaleDefinition()
  const { data: paymentsData, isLoading: paymentsIsLoading } = useGetSubscriptionQuery()

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
