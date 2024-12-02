import { Dispatch, SetStateAction, useState } from 'react'

import {
  RequestLineLoader,
  useRelocateToProfile,
  useRouterLocaleDefinition,
  useSearchBy,
} from '@/shared'
import { TextField } from '@technosamurai/techno-ui-kit'

import s from './FollowersInfo.module.scss'

import { FollowerItem } from './followerItem/FollowerItem'

interface IProps {
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

const data = [{ id: '123' }, { id: '1236789' }]

export const FollowersInfo = ({ setOpenModal }: IProps) => {
  const t = useRouterLocaleDefinition()
  const [searchTerm, setSearchTerm] = useState('')
  const refetch = () => {}

  const { changeSearchHandler } = useSearchBy(refetch, setSearchTerm)
  const { isLoadingRelocate, navigateToProfileHandler, userId } = useRelocateToProfile(setOpenModal)

  return (
    <>
      {isLoadingRelocate && <RequestLineLoader />}
      <div className={s.wrapper}>
        <TextField
          onChange={changeSearchHandler}
          placeholder={t.profile.info.stats.searchPlaceholder}
          type={'search'}
          value={searchTerm}
        />

        {data.map(item => {
          return (
            <FollowerItem
              key={item.id}
              navigateToProfile={navigateToProfileHandler}
              userName={'Hello World'}
            />
          )
        })}
      </div>
    </>
  )
}
