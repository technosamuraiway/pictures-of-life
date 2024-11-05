import { PaymentsTable } from '@/entities'
import { Tabs } from '@technosamurai/techno-ui-kit'

interface IProps {
  value: string
}

export const Payments = ({ value }: IProps) => {
  return (
    <Tabs.Content value={value}>
      <PaymentsTable />
    </Tabs.Content>
  )
}
