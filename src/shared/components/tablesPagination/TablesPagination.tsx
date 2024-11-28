import { Dispatch, SetStateAction } from 'react'

import { useRouterLocaleDefinition } from '@/shared'
import { Pagination, Typography } from '@technosamurai/techno-ui-kit'

interface IProps {
  currentPage: number
  currentPerPage: number
  data: any
  isLoading?: boolean
  isShowPagination?: boolean
  pageCount: number
  perPage: number[]
  refetch: () => void
  setCurrentPage: Dispatch<SetStateAction<number>>
  setCurrentPerPage: Dispatch<SetStateAction<number>>
}

export const TablesPagination = ({
  currentPage,
  currentPerPage,
  isLoading,
  isShowPagination,
  pageCount,
  perPage,
  refetch,
  setCurrentPage,
  setCurrentPerPage,
}: IProps) => {
  const t = useRouterLocaleDefinition()

  const perPageChangeHandler = (newPage: number) => {
    setCurrentPerPage(newPage)
    refetch()
  }

  if (isLoading) {
    return (
      <Typography style={{ textAlign: 'center' }} variant={'h2'}>
        {t.pagination.status} 😎
      </Typography>
    )
  }

  if (!isShowPagination) {
    return null
  }

  return (
    <Pagination
      count={pageCount}
      onChange={setCurrentPage}
      onPageTitle={t.pagination.onPage}
      onPerPageChange={perPageChangeHandler}
      page={currentPage}
      perPage={currentPerPage}
      perPageOptions={perPage}
      showTitle={t.pagination.show}
    />
  )
}
