import { Dispatch, SetStateAction } from 'react'

import { useRouterLocaleDefinition } from '@/shared'
import { useMeWithRouter } from '@/shared/hooks/meWithRouter/useMeWithRouter'
import { Button } from '@technosamurai/techno-ui-kit'

import s from './FollowingButtons.module.scss'

interface IProps {
  followUser: () => void
  isFollowing?: boolean
  isLoading: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
  userId?: number
}

export const FollowingButtons = ({
  followUser,
  isFollowing,
  isLoading,
  setOpenModal,
  userId,
}: IProps) => {
  const t = useRouterLocaleDefinition()
  const { meData: meRequestData } = useMeWithRouter()

  return (
    <div className={s.buttonsWrapper}>
      {userId !== meRequestData?.userId && (
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
