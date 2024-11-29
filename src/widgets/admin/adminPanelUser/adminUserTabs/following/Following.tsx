import { FollowTable } from '@/entities'
import { GET_USER_FOLLOWING } from '@/services/graphql/queries/user'
import { InitLoader, TablesPagination, usePaginationAndSortDirection } from '@/shared'
import { useQuery } from '@apollo/client'
import { Tabs } from '@technosamurai/techno-ui-kit'

interface IProps {
  value: string
}

export const Following = ({ value }: IProps) => {
  const {
    PER_PAGE,
    currentPage,
    currentPerPage,
    setCurrentPage,
    setCurrentPerPage,
    setSortDirection,
    sortDirection,
    t,
    userId,
  } = usePaginationAndSortDirection()

  const {
    data: getFollowingData,
    loading: getFollowingIsLoading,
    refetch: getFollowingRefetch,
  } = useQuery(GET_USER_FOLLOWING, {
    variables: {
      pageNumber: currentPage,
      pageSize: Number(currentPerPage),
      sortBy: 'createdAt',
      sortDirection,
      userId: Number(userId),
    },
  })

  const shouldShowPagination = getFollowingData && getFollowingData?.getFollowing?.totalCount > 4
  const pageCountDecider = getFollowingData?.getFollowing?.pagesCount || 5

  return (
    <>
      {getFollowingIsLoading ? (
        <InitLoader />
      ) : (
        <Tabs.Content value={value}>
          <FollowTable
            emptyTableText={t.admin.userList.tabs.following.emptyTable}
            setSortDirection={setSortDirection}
            sortDirection={sortDirection}
            tableData={getFollowingData?.getFollowing?.items || []}
          />
          <TablesPagination
            currentPage={currentPage}
            currentPerPage={currentPerPage}
            isShowPagination={shouldShowPagination}
            pageCount={pageCountDecider}
            perPage={PER_PAGE}
            refetch={getFollowingRefetch}
            setCurrentPage={setCurrentPage}
            setCurrentPerPage={setCurrentPerPage}
          />
        </Tabs.Content>
      )}
    </>
  )
}
