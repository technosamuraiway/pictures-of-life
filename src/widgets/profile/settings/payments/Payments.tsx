import { PaymentsTable } from '@/entities'
import { useRouterLocaleDefinition, useSuperPagination } from '@/shared'
import { Tabs } from '@technosamurai/techno-ui-kit'

import s from './Payments.module.scss'

interface IProps {
  value: string
}

const PER_PAGE = [5, 10, 20]

export const Payments = ({ value }: IProps) => {
  const t = useRouterLocaleDefinition()
  const { currentPage, currentPageHandler, itemsPerPage, optionsItemsPerPage, perPageHandler } =
    useSuperPagination(PER_PAGE)

  return (
    <Tabs.Content className={s.wrapper} value={value}>
      <PaymentsTable />
      <Pagination
        count={20}
        onChange={currentPageHandler}
        onPageTitle={t.pagination.onPage}
        onPerPageChange={perPageHandler}
        page={+currentPage}
        perPage={+itemsPerPage}
        perPageOptions={optionsItemsPerPage}
        showTitle={t.pagination.show}
      />
    </Tabs.Content>
  )
}
