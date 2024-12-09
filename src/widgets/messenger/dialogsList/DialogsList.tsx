import { useState } from 'react'

import { IDialogList, useRouterLocaleDefinition, useSearchBy } from '@/shared'
import { Scrollbar, TextField } from '@technosamurai/techno-ui-kit'

import s from './DialogsList.module.scss'

import { DialogList } from './dialogList/DialogList'

interface IProps {
  dialogs: IDialogList[]
}

export const DialogsList = ({ dialogs }: IProps) => {
  const t = useRouterLocaleDefinition()

  const [searchTerm, setSearchTerm] = useState('')
  const { changeSearchHandler } = useSearchBy(setSearchTerm)

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
          {dialogs?.map(dialog => <DialogList dialog={dialog} key={dialog.id} />)}
        </ul>
      </Scrollbar>
    </div>
  )
}
