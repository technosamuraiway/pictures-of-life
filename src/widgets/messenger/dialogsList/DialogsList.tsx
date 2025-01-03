import { useEffect } from 'react'

import { useGetLatestMessengersQuery } from '@/services'
import { useDialogListStore, useRouterLocaleDefinition, useSearchBySearchName } from '@/shared'
import { useMeWithRouter } from '@/shared/hooks/meWithRouter/useMeWithRouter'
import { Scrollbar, TextField } from '@technosamurai/techno-ui-kit'

import s from './DialogsList.module.scss'

import { DialogList } from './dialogList/DialogList'

const PAGE_SIZE = 50
const SCROLL_BAR_HEIGHT = 574

export const DialogsList = () => {
  const t = useRouterLocaleDefinition()
  const { changeSearchHandler, searchTerm } = useSearchBySearchName()

  const { meData: meRequestData } = useMeWithRouter()

  const {
    isDialogListRefetching,
    latestMessages,
    setLatestMessages,
    switchDialogListRefetchingFalse,
  } = useDialogListStore()

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
  }, [isDialogListRefetching, refetch, switchDialogListRefetchingFalse])

  useEffect(() => {
    if (getLatestMessengersData && meRequestData) {
      setLatestMessages(getLatestMessengersData, meRequestData.userId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getLatestMessengersData, setLatestMessages])

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
          {latestMessages &&
            Object.values(latestMessages.messages).map(dialog => (
              <DialogList dialog={dialog} key={dialog.id} />
            ))}
        </ul>
      </Scrollbar>
    </div>
  )
}
