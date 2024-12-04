import { Dispatch, SetStateAction } from 'react'

import { useRouterLocaleDefinition } from '@/shared'
import { Button } from '@technosamurai/techno-ui-kit'

import s from './FollowingButtons.module.scss'

interface IProps {
  followUser: () => void
  isFollowing: boolean
  isLoading: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

export const FollowingButtons = ({ followUser, isFollowing, setOpenModal }: IProps) => {
  const t = useRouterLocaleDefinition()

  return (
    <div className={s.buttonsWrapper}>
      <Button
        onClick={isFollowing ? () => setOpenModal(true) : followUser}
        variant={isFollowing ? 'outline' : 'primary'}
      >
        {isFollowing
          ? t.profile.info.stats.following.unFollow
          : t.profile.info.stats.following.follow}
      </Button>
    </div>
  )
}
