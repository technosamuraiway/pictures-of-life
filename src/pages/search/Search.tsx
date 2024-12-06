import React, { useCallback, useEffect } from 'react'

import { GET_USERS } from '@/services/graphql/queries/user'
import { useUserSearchStore } from '@/services/store/userSearchStore'
import { useRouterLocaleDefinition } from '@/shared'
import { getLayoutWithNav } from '@/widgets'
import { useQuery } from '@apollo/client'
import { TextField, Typography } from '@technosamurai/techno-ui-kit'
import { debounce } from 'lodash'
import Image from 'next/image'
import Link from 'next/link'

import s from './Search.module.scss'

const Search = () => {
  const t = useRouterLocaleDefinition()

  const { recentUsers, searchInput, setRecentUsers, setSearchInput } = useUserSearchStore()

  const { data, loading, refetch } = useQuery(GET_USERS, {
    onCompleted: data => {
      if (data.getUsers?.users && searchInput !== '') {
        setRecentUsers(data.getUsers.users)
      }
    },
    skip: searchInput === '',
    variables: {
      pageNumber: 1,
      pageSize: 10,
    },
  })

  const handleSearchRefetch = (newSearchTerm: string) => {
    refetch({ searchTerm: newSearchTerm })
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceFn = useCallback(debounce(handleSearchRefetch, 1000), [])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event?.target?.value)
  }

  useEffect(() => {
    debounceFn(searchInput)

    return () => debounceFn.cancel()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput])

  useEffect(() => {
    if (!loading && data && searchInput) {
      setRecentUsers(data.getUsers.users)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, data, searchInput])

  return (
    <div className={s.wrapper}>
      <Typography as={'h1'} variant={'h1'}>
        {t.searchPage.search}
      </Typography>
      <TextField
        onChange={handleSearchChange}
        placeholder={t.admin.usersList.search}
        type={'search'}
        value={searchInput}
      />
      <Typography as={'h3'} variant={'h3'}>
        Recent requests
      </Typography>
      <div className={s.usersWrapper}>
        {
          // eslint-disable-next-line no-nested-ternary
          searchInput ? (
            data?.getUsers?.users?.map(user => (
              <div className={s.iconWrapper} key={user.id}>
                {user?.profile?.avatars?.[0]?.url ? (
                  <Image
                    alt={'Avatar'}
                    className={s.avatar}
                    height={48}
                    src={user?.profile?.avatars?.[0]?.url}
                    width={48}
                  />
                ) : (
                  <div className={s.avatarPlaceholder}>{user.userName.charAt(0).toUpperCase()}</div>
                )}
                <div className={s.userNameWrapper}>
                  <Link href={`/profile/${user.id}`}>
                    <Typography className={s.text} variant={'bold-text-14'}>
                      {user?.profile?.userName}
                    </Typography>
                  </Link>
                  <Typography className={s.greyText} variant={'regular-text-14'}>
                    {user?.profile?.firstName}&nbsp;{user?.profile?.lastName}
                  </Typography>
                </div>
              </div>
            ))
          ) : recentUsers?.length > 0 ? (
            recentUsers?.map(user => (
              <div className={s.iconWrapper} key={user.id}>
                {user?.profile?.avatars?.[0]?.url ? (
                  <Image
                    alt={'Avatar'}
                    className={s.avatar}
                    height={48}
                    src={user?.profile?.avatars?.[0]?.url}
                    width={48}
                  />
                ) : (
                  <div className={s.avatarPlaceholder}>{user.userName.charAt(0).toUpperCase()}</div>
                )}
                <div className={s.userNameWrapper}>
                  <Link href={`/profile/${user.id}`}>
                    <Typography className={s.text} variant={'bold-text-14'}>
                      {user?.profile?.userName}
                    </Typography>
                  </Link>
                  <Typography className={s.greyText} variant={'regular-text-14'}>
                    {user?.profile?.firstName}&nbsp;{user?.profile?.lastName}
                  </Typography>
                </div>
              </div>
            ))
          ) : (
            <div className={s.empty}>
              <Typography className={s.lightgreyText} variant={'bold-text-14'}>
                Oops! This place looks empty!
              </Typography>
              <Typography className={s.greyText} variant={'small-text'}>
                No recent requests
              </Typography>
            </div>
          )
        }
      </div>
    </div>
  )
}

Search.getLayout = getLayoutWithNav
export default Search
