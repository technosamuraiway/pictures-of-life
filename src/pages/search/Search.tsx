import React, { useCallback, useEffect, useState } from 'react'

import { useGetUserSearchQuery } from '@/services/flow/users.service'
import { useUserSearchStore } from '@/services/store/userSearchStore'
import { useRouterLocaleDefinition } from '@/shared'
import { getLayoutWithNav } from '@/widgets'
import RecentUsers from '@/widgets/recentUsers/RecentUsers'
import SearchingEmpty from '@/widgets/searchingEmpty/SearchingEmpty'
import SearchingUsers from '@/widgets/searchingUsers/SearchingUsers'
import { TextField, Typography } from '@technosamurai/techno-ui-kit'
import { debounce } from 'lodash'

import s from './Search.module.scss'

const Search = () => {
  const t = useRouterLocaleDefinition()

  const [inputValue, setInputValue] = useState('')

  const { recentUsers, searchInput, setRecentUsers, setSearchInput } = useUserSearchStore()

  const { data, isLoading } = useGetUserSearchQuery(
    { search: searchInput },
    { skip: searchInput === '' }
  )
  const handleDebounceFn = (inputValue: any) => {
    setSearchInput(inputValue)
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceFn = useCallback(debounce(handleDebounceFn, 1000), [])

  const handleChangeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event?.target?.value)
    debounceFn(event?.target?.value)
  }

  useEffect(() => {
    if (!isLoading && data && searchInput) {
      setRecentUsers(data?.items)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, data, searchInput])

  return (
    <div className={s.wrapper}>
      <Typography as={'h1'} variant={'h1'}>
        {t.searchPage.search}
      </Typography>
      <TextField
        onChange={handleChangeInputValue}
        placeholder={t.admin.usersList.search}
        type={'search'}
        value={inputValue}
      />
      <Typography as={'h3'} variant={'h3'}>
        Recent requests
      </Typography>
      <div className={s.usersWrapper}>
        {
          // eslint-disable-next-line no-nested-ternary
          searchInput ? (
            <SearchingUsers users={data?.items ?? []} />
          ) : recentUsers?.length > 0 ? (
            <RecentUsers recentUsers={recentUsers} />
          ) : (
            <SearchingEmpty />
          )
        }
      </div>
    </div>
  )
}

Search.getLayout = getLayoutWithNav
export default Search
