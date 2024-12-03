import { PaymentsTable } from '@/entities'
import { IMyPaymentsResponse } from '@/services'
import { GET_USER_PAYMENTS } from '@/services/graphql/queries/user'
import { InitLoader, TablesPagination, usePaginationAndSortDirection } from '@/shared'
import { useQuery } from '@apollo/client'
import { Tabs } from '@technosamurai/techno-ui-kit'

interface IProps {
  value: string
}

export const UserPayments = ({ value }: IProps) => {
  const {
    PER_PAGE,
    currentPage,
    currentPerPage,
    setCurrentPage,
    setCurrentPerPage,
    sortBy,
    t,
    userId,
  } = usePaginationAndSortDirection()

  const {
    data: getPaymentsData,
    loading: getPaymentsIsLoading,
    refetch: getPaymentsRefetch,
  } = useQuery(GET_USER_PAYMENTS, {
    variables: {
      pageNumber: currentPage,
      pageSize: Number(currentPerPage),
      sortBy,
      userId: Number(userId),
    },
  })

  const paymentData = (getPaymentsData?.getPaymentsByUser?.items?.map(el => ({
    dateOfPayment: el.dateOfPayment,
    endDateOfSubscription: el.endDate,
    paymentType: el.paymentType,
    price: el.price,
    subscriptionId: el.id,
    subscriptionType: el.type,
    userId: el.businessAccountId,
  })) ?? []) as IMyPaymentsResponse[]

  const shouldShowPagination = getPaymentsData && getPaymentsData?.getPaymentsByUser?.totalCount > 4
  const pageCountDecider = getPaymentsData?.getPaymentsByUser?.pagesCount || 5

  return (
    <>
      {getPaymentsIsLoading ? (
        <InitLoader />
      ) : (
        <Tabs.Content value={value}>
          <PaymentsTable
            emptyTableText={t.admin.userList.tabs.payments.emptyTable}
            tableData={paymentData}
          />
          <TablesPagination
            currentPage={currentPage}
            currentPerPage={currentPerPage}
            isShowPagination={shouldShowPagination}
            pageCount={pageCountDecider}
            perPage={PER_PAGE}
            refetch={getPaymentsRefetch}
            setCurrentPage={setCurrentPage}
            setCurrentPerPage={setCurrentPerPage}
          />
        </Tabs.Content>
      )}
    </>
  )
}
