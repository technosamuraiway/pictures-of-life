import React, { useCallback, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { useGetUserSearchQuery } from '@/services/flow/users.service'
import { useUserSearchStore } from '@/services/store/userSearchStore'
import { UserSearch } from '@/services/types/users.types'
import { useRouterLocaleDefinition } from '@/shared'
import { getLayoutWithNav } from '@/widgets'
import SearchingEmpty from '@/widgets/search/searchingEmpty/SearchingEmpty'
import SearchingUsers from '@/widgets/search/searchingUsers/SearchingUsers'
import { TextField, Typography } from '@technosamurai/techno-ui-kit'
import { debounce } from 'lodash'

import s from './Search.module.scss'

const Search = () => {
  const t = useRouterLocaleDefinition()

  //infinity scroll
  const { inView, ref } = useInView()
  const [endCursorId, setEndCursorId] = useState<number>(0)
  const [inputValue, setInputValue] = useState('')

  const [searchingUsers, setSearchingUsers] = useState<UserSearch[]>([])

  const { recentUsers, searchInput, setRecentUsers, setSearchInput } = useUserSearchStore()

  const { data, isLoading } = useGetUserSearchQuery(
    { cursor: endCursorId, search: searchInput },
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
    if (data && data.items) {
      if (endCursorId === 0) {
        setSearchingUsers(data.items)
      } else {
        setSearchingUsers(prevData => [...prevData, ...data.items])
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, endCursorId])

  useEffect(() => {
    if (data && inView && searchingUsers.length > 0) {
      const lastImageId = searchingUsers[searchingUsers.length - 1].id

      if (endCursorId !== lastImageId) {
        setEndCursorId(lastImageId)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endCursorId, inView])

  useEffect(() => {
    if (data?.items.length === 0 || searchInput === '') {
      setSearchingUsers([])
    }
    if (data && data.items) {
      setEndCursorId(0)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput])

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
          searchInput !== '' ? (
            <>
              <SearchingUsers users={searchingUsers} />
              <div ref={ref} style={{ height: '30px', width: '100%' }} />
            </>
          ) : (
            <SearchingEmpty />
          )

          //     recentUsers?.length > 0 ? (
          //   <SearchingUsers users={recentUsers} />
          // ) : (
          //   <SearchingEmpty />
          // )
        }
      </div>
    </div>
  )
}

Search.getLayout = getLayoutWithNav
export default Search
