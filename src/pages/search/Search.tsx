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
  const { recentUsers, searchInput, setRecentUsers, setSearchInput } = useUserSearchStore()

  const [inputValue, setInputValue] = useState('')

  // ----------------------------------------------------------------------------
  const { inView, ref } = useInView()
  const [cursorId, setCursorId] = useState<number | undefined>(0)
  const [usersCurrent, setUsersCurrent] = useState<UserSearch[]>([])

  const { data: getUsersListData, isLoading } = useGetUserSearchQuery(
    { cursor: cursorId, search: searchInput },
    { skip: searchInput === '' }
  )

  useEffect(() => {
    if (getUsersListData && getUsersListData.items) {
      if (cursorId === 0) {
        setUsersCurrent(getUsersListData.items)
      } else {
        setUsersCurrent(prevPosts => {
          const updatedPosts = prevPosts.map(existingPost => {
            const updatedPost = getUsersListData.items.find(
              newUser => newUser.id === existingPost.id
            )

            return updatedPost || existingPost
          })

          const newPosts = getUsersListData.items.filter(
            newPost => !prevPosts.some(existingPost => existingPost.id === newPost.id)
          )

          return [...updatedPosts, ...newPosts]
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getUsersListData, cursorId])

  useEffect(() => {
    if (getUsersListData && inView && usersCurrent.length > 0) {
      const lastImageId = usersCurrent[usersCurrent.length - 1].id

      if (cursorId !== lastImageId) {
        setCursorId(lastImageId)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursorId, inView])

  // ----------------------------------------------------------------------------
  const handleDebounceFn = (inputValue: any) => {
    setSearchInput(inputValue)
    setCursorId(0)
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceFn = useCallback(debounce(handleDebounceFn, 1000), [])

  const handleChangeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event?.target?.value)
    debounceFn(event?.target?.value)
  }

  useEffect(() => {
    if (!isLoading && getUsersListData && searchInput) {
      setRecentUsers(getUsersListData?.items)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, getUsersListData, searchInput])

  const renderContent = () => {
    if (searchInput) {
      return usersCurrent.length > 0 ? <SearchingUsers users={usersCurrent} /> : <SearchingEmpty />
    } else {
      return recentUsers.length > 0 ? <RecentUsers recentUsers={recentUsers} /> : <SearchingEmpty />
    }
  }

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
      <div className={s.usersWrapper}>{renderContent()}</div>
      <div ref={ref} style={{ height: '30px', width: '100%' }} />
    </div>
  )
}

Search.getLayout = getLayoutWithNav
export default Search
