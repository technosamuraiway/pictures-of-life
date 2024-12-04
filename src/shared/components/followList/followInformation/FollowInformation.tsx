import { ChangeEvent } from 'react'

import { UserFollowItems } from '@/services'
import { RequestLineLoader, useRouterLocaleDefinition } from '@/shared'
import { Scrollbar, TextField } from '@technosamurai/techno-ui-kit'

import s from './FollowInformation.module.scss'

import { FollowItem } from './followItem/FollowItem'

interface IProps {
  changeSearch: (event: ChangeEvent<HTMLInputElement>) => void
  data?: UserFollowItems[]
  isFollowers: boolean
  isLoading: boolean
  navigateToProfile: (id: string) => void
  searchTerm: string
}

export const FollowInformation = ({
  changeSearch,
  data,
  isFollowers,
  isLoading,
  navigateToProfile,
  searchTerm,
}: IProps) => {
  const t = useRouterLocaleDefinition()

  return (
    <>
      {isLoading && <RequestLineLoader />}
      <div className={s.wrapper}>
        <TextField
          onChange={changeSearch}
          placeholder={t.profile.info.stats.searchPlaceholder}
          type={'search'}
          value={searchTerm}
        />
        <Scrollbar maxHeight={400}>
          <div className={s.itemsWrapper}>
            {data?.map(item => {
              return (
                <FollowItem
                  isFollowers={isFollowers}
                  item={item}
                  key={item.id}
                  navigateToProfile={navigateToProfile}
                />
              )
            })}
          </div>
        </Scrollbar>
      </div>
    </>
  )
}
