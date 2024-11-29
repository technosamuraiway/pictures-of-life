import { FollowTable } from '@/entities'
import { GET_USER_FOLLOWERS } from '@/services/graphql/queries/user'
import { InitLoader, TablesPagination, usePaginationAndSortDirection } from '@/shared'
import { useQuery } from '@apollo/client'
import { Tabs } from '@technosamurai/techno-ui-kit'

interface IProps {
  value: string
}

export const Followers = ({ value }: IProps) => {
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
    data: getFollowersData,
    loading: getFollowersIsLoading,
    refetch: getFollowersRefetch,
  } = useQuery(GET_USER_FOLLOWERS, {
    variables: {
      pageNumber: currentPage,
      pageSize: Number(currentPerPage),
      sortBy: 'createdAt',
      sortDirection,
      userId: Number(userId),
    },
  })

  const shouldShowPagination = getFollowersData && getFollowersData?.getFollowers?.totalCount > 4
  const pageCountDecider = getFollowersData?.getFollowers?.pagesCount || 5

  return (
    <>
      {getFollowersIsLoading ? (
        <InitLoader />
      ) : (
        <Tabs.Content value={value}>
          <FollowTable
            emptyTableText={t.admin.userList.tabs.following.emptyTable}
            setSortDirection={setSortDirection}
            sortDirection={sortDirection}
            tableData={getFollowersData?.getFollowers?.items || []}
          />
          <TablesPagination
            currentPage={currentPage}
            currentPerPage={currentPerPage}
            isShowPagination={shouldShowPagination}
            pageCount={pageCountDecider}
            perPage={PER_PAGE}
            refetch={getFollowersRefetch}
            setCurrentPage={setCurrentPage}
            setCurrentPerPage={setCurrentPerPage}
          />
        </Tabs.Content>
      )}
    </>
  )
}
