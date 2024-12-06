import { Dispatch, SetStateAction } from 'react'

import { useMeCurInfoQuery } from '@/services'
import { useRouterLocaleDefinition } from '@/shared'
import { Button } from '@technosamurai/techno-ui-kit'

import s from './FollowingButtons.module.scss'

interface IProps {
  followUser: () => void
  isFollowing?: boolean
  isLoading: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
  userId: number
}

export const FollowingButtons = ({
  followUser,
  isFollowing,
  isLoading,
  setOpenModal,
  userId,
}: IProps) => {
  const t = useRouterLocaleDefinition()
  const { data } = useMeCurInfoQuery()

  return (
    <div className={s.buttonsWrapper}>
      {userId !== data?.userId && (
        <Button
          disabled={isLoading}
          onClick={isFollowing ? () => setOpenModal(true) : followUser}
          variant={isFollowing ? 'outline' : 'primary'}
        >
          {isFollowing
            ? t.profile.info.stats.following.unFollow
            : t.profile.info.stats.following.follow}
        </Button>
      )}
    </div>
  )
}
