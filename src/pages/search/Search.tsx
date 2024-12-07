import React, { useCallback, useEffect, useState } from 'react'

import { useGetUserSearchQuery } from '@/services/flow/users.service'
import { useUserSearchStore } from '@/services/store/userSearchStore'
import { useRouterLocaleDefinition } from '@/shared'
import { getLayoutWithNav } from '@/widgets'
import { TextField, Typography } from '@technosamurai/techno-ui-kit'
import { debounce } from 'lodash'
import Image from 'next/image'
import Link from 'next/link'

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
            data?.items?.map(user => (
              <div className={s.iconWrapper} key={user.id}>
                {user?.avatars?.[0]?.url ? (
                  <Image
                    alt={'Avatar'}
                    className={s.avatar}
                    height={48}
                    src={user?.avatars?.[0]?.url}
                    width={48}
                  />
                ) : (
                  <div className={s.avatarPlaceholder}>{user.userName.charAt(0).toUpperCase()}</div>
                )}
                <div className={s.userNameWrapper}>
                  <Link href={`/profile/${user.id}`}>
                    <Typography className={s.text} variant={'bold-text-14'}>
                      {user?.userName}
                    </Typography>
                  </Link>
                  <Typography className={s.greyText} variant={'regular-text-14'}>
                    {user?.firstName}&nbsp;{user?.lastName}
                  </Typography>
                </div>
              </div>
            ))
          ) : recentUsers?.length > 0 ? (
            recentUsers?.map(user => (
              <div className={s.iconWrapper} key={user.id}>
                {user?.avatars?.[0]?.url ? (
                  <Image
                    alt={'Avatar'}
                    className={s.avatar}
                    height={48}
                    src={user?.avatars?.[0]?.url}
                    width={48}
                  />
                ) : (
                  <div className={s.avatarPlaceholder}>{user.userName.charAt(0).toUpperCase()}</div>
                )}
                <div className={s.userNameWrapper}>
                  <Link href={`/profile/${user.id}`}>
                    <Typography className={s.text} variant={'bold-text-14'}>
                      {user?.userName}
                    </Typography>
                  </Link>
                  <Typography className={s.greyText} variant={'regular-text-14'}>
                    {user?.firstName}&nbsp;{user?.lastName}
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
