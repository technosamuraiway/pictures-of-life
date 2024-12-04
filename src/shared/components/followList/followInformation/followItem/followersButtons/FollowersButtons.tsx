import { Dispatch, SetStateAction } from 'react'

import { useRouterLocaleDefinition } from '@/shared'
import { Button } from '@technosamurai/techno-ui-kit'

import s from './FollowersButtons.module.scss'

interface IProps {
  followUser: () => void
  isFollowing?: boolean
  isLoading: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

export const FollowersButtons = ({ followUser, isFollowing, isLoading, setOpenModal }: IProps) => {
  const t = useRouterLocaleDefinition()

  return (
    <div className={s.buttonsWrapper}>
      {isFollowing ? (
        <Button disabled={isLoading} onClick={() => setOpenModal(true)} variant={'secondary'}>
          {t.profile.info.stats.followers.delete}
        </Button>
      ) : (
        <Button disabled={isLoading} onClick={followUser} variant={'primary'}>
          {t.profile.info.stats.followers.follow}
        </Button>
      )}
    </div>
  )
}
