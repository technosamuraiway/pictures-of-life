import { useGetLatestMessengersQuery } from '@/services'
import { useRouterLocaleDefinition, useSearchBySearchName } from '@/shared'
import { Scrollbar, TextField } from '@technosamurai/techno-ui-kit'

import s from './DialogsList.module.scss'

import { DialogList } from './dialogList/DialogList'

const PAGE_SIZE = 50

export const DialogsList = () => {
  const t = useRouterLocaleDefinition()
  const { changeSearchHandler, searchTerm } = useSearchBySearchName()

  const { data: getLatestMessengersData } = useGetLatestMessengersQuery({
    pageSize: PAGE_SIZE,
    searchName: searchTerm,
  })

  return (
    <div className={s.wrapper}>
      <TextField
        className={s.search}
        onChange={changeSearchHandler}
        placeholder={t.messenger.searchInput}
        type={'search'}
        value={searchTerm}
      />
      <Scrollbar maxHeight={574}>
        <ul className={s.listWrapper}>
          {getLatestMessengersData?.items.map(dialog => (
            <DialogList dialog={dialog} key={dialog.id} />
          ))}
        </ul>
      </Scrollbar>
    </div>
  )
}
