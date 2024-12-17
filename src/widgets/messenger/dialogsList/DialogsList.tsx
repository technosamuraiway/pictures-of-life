import { useEffect } from 'react'

import { useGetLatestMessengersQuery } from '@/services'
import { useRouterLocaleDefinition, useSearchBySearchName } from '@/shared'
import { useDialogListStore } from '@/shared/hooks/zustand/useDialogListStore'
import { Scrollbar, TextField } from '@technosamurai/techno-ui-kit'

import s from './DialogsList.module.scss'

import { DialogList } from './dialogList/DialogList'

const PAGE_SIZE = 50
const SCROLL_BAR_HEIGHT = 574

export const DialogsList = () => {
  const t = useRouterLocaleDefinition()
  const { changeSearchHandler, searchTerm } = useSearchBySearchName()
  const { isDialogListRefetching, switchDialogListRefetchingFalse } = useDialogListStore()

  const { data: getLatestMessengersData, refetch } = useGetLatestMessengersQuery({
    pageSize: PAGE_SIZE,
    searchName: searchTerm,
  })

  useEffect(() => {
    if (isDialogListRefetching) {
      refetch()
      switchDialogListRefetchingFalse()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDialogListRefetching])

  return (
    <div className={s.wrapper}>
      <TextField
        className={s.search}
        onChange={changeSearchHandler}
        placeholder={t.messenger.searchInput}
        type={'search'}
        value={searchTerm}
      />
      <Scrollbar maxHeight={SCROLL_BAR_HEIGHT}>
        <ul className={s.listWrapper}>
          {getLatestMessengersData?.items.map(dialog => (
            <DialogList dialog={dialog} key={dialog.id} />
          ))}
        </ul>
      </Scrollbar>
    </div>
  )
}
