import { Dispatch, SetStateAction } from 'react'

import { useGetUserByUserNameQuery } from '@/services/flow/users.service'
import { PATH, useRouterLocaleDefinition } from '@/shared'
import { FollowingButtons } from '@/shared/components/followList/followInformation/followItem/followingButtons/FollowingButtons'
import { Button } from '@technosamurai/techno-ui-kit'
import Link from 'next/link'

import s from './FriendButtons.module.scss'

interface IProps {
  followUser: () => void
  isLoading: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
  userName: string
}

export const FriendButtons = ({ followUser, isLoading, setOpenModal, userName }: IProps) => {
  const t = useRouterLocaleDefinition()
  const { data: getUserData } = useGetUserByUserNameQuery(userName)

  return (
    <div className={s.friendButtons}>
      <FollowingButtons
        followUser={followUser}
        isFollowing={getUserData?.isFollowing}
        isLoading={isLoading}
        setOpenModal={setOpenModal}
      />
      <Button as={Link} disabled={isLoading} href={PATH.MESSENGER} variant={'secondary'}>
        {t.messenger.profileButton}
      </Button>
    </div>
  )
}