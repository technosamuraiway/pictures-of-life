import React, { useRef, useState } from 'react'

import { useRouterLocaleDefinition } from '@/shared'
import { getLayoutWithNav } from '@/widgets'
import { TextField, Typography } from '@technosamurai/techno-ui-kit'

import s from './Search.module.scss'

const Search = () => {
  const t = useRouterLocaleDefinition()

  const [searchTerm, setSearchTerm] = useState('')

  // eslint-disable-next-line no-undef
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    setSearchTerm(value)

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current)
    }

    debounceTimeout.current = setTimeout(() => {
      // refetch() // Выполнить запрос после дебаунса
    }, 1000) // Задержка в 300 мс
  }

  return (
    <div className={s.wrapper}>
      <Typography as={'h1'} variant={'h1'}>
        {t.searchPage.search}
      </Typography>
      <TextField
        onChange={handleSearchChange} // Обработчик изменения поля ввода
        placeholder={t.admin.usersList.search}
        type={'search'}
        value={searchTerm}
      />
      <Typography as={'h3'} variant={'h3'}>
        Recent requests
      </Typography>
    </div>
  )
}

Search.getLayout = getLayoutWithNav
export default Search
