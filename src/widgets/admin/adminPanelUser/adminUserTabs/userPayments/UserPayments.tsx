import { useState } from 'react'

import { PaymentsTable } from '@/entities'
import { IMyPaymentsResponse } from '@/services'
import { useRouterLocaleDefinition } from '@/shared'
import { Pagination, Tabs } from '@technosamurai/techno-ui-kit'

interface IProps {
  value: string
}

const TOTAL_PAGES_COUNT = 2
const PER_PAGE = [5, 10, 250]

const data: IMyPaymentsResponse[] = [
  {
    dateOfPayment: '2024-11-28T00:00:00Z',
    endDateOfSubscription: '2024-11-28T00:00:00Z',
    paymentType: 'STRIPE',
    price: 25,
    subscriptionId: 'Stiфыch',
    subscriptionType: 'Test',
    userId: 1487,
  },
  {
    dateOfPayment: '2024-11-28T00:00:00Z',
    endDateOfSubscription: '2024-11-28T00:00:00Z',
    paymentType: 'STRIPE',
    price: 25,
    subscriptionId: 'Stiфыch',
    subscriptionType: 'Test',
    userId: 1487,
  },
  {
    dateOfPayment: '2024-11-28T00:00:00Z',
    endDateOfSubscription: '2024-11-28T00:00:00Z',
    paymentType: 'STRIPE',
    price: 25,
    subscriptionId: 'Stiфыch',
    subscriptionType: 'Test',
    userId: 1487,
  },
  {
    dateOfPayment: '2024-11-28T00:00:00Z',
    endDateOfSubscription: '2024-11-28T00:00:00Z',
    paymentType: 'STRIPE',
    price: 25,
    subscriptionId: 'Stiфыch',
    subscriptionType: 'Test',
    userId: 1487,
  },
  {
    dateOfPayment: '2024-11-28T00:00:00Z',
    endDateOfSubscription: '2024-11-28T00:00:00Z',
    paymentType: 'STRIPE',
    price: 25,
    subscriptionId: 'Stiфыch',
    subscriptionType: 'Test',
    userId: 1487,
  },
]

export const UserPayments = ({ value }: IProps) => {
  const t = useRouterLocaleDefinition()
  const [currentPage, setCurrentPage] = useState(1)
  const [currentPerPage, setCurrentPerPage] = useState(PER_PAGE[0])

  return (
    <Tabs.Content value={value}>
      <PaymentsTable emptyTableText={t.admin.userList.tabs.payments.emptyTable} tableData={data} />
      {data.length > 4 && (
        <Pagination
          count={TOTAL_PAGES_COUNT}
          onChange={setCurrentPage}
          onPageTitle={t.pagination.onPage}
          onPerPageChange={setCurrentPerPage}
          page={currentPage}
          perPage={currentPerPage}
          perPageOptions={PER_PAGE}
          showTitle={t.pagination.show}
        />
      )}
    </Tabs.Content>
  )
}
