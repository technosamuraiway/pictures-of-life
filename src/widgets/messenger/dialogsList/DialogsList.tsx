import { Scrollbar, TextField } from '@technosamurai/techno-ui-kit'

import s from './DialogsList.module.scss'

import { DialogList } from './dialogList/DialogList'
import { useDialogsData } from './lib/useDialogsData'

const SCROLL_BAR_HEIGHT = 574

export const DialogsList = () => {
  const { changeSearchHandler, searchTerm, sortedDialogs, t } = useDialogsData()

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
          {sortedDialogs &&
            sortedDialogs.map(dialog => <DialogList dialog={dialog} key={dialog.id} />)}
        </ul>
      </Scrollbar>
    </div>
  )
}
