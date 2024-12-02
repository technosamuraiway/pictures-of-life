import { useState } from 'react'

import { ActionConfirmationModal } from '@/entities'
import { AvatarWithUserName, useRouterLocaleDefinition } from '@/shared'
import { Button } from '@technosamurai/techno-ui-kit'

import s from './FollowingItem.module.scss'

interface IProps {
  navigateToProfile: (id: string) => void
  userName: string
}

export const FollowingItem = ({ navigateToProfile, userName }: IProps) => {
  const t = useRouterLocaleDefinition()
  const [openUnfollowModal, setOpenUnfollowModal] = useState(false)

  const navigateToProfileHandler = () => {
    navigateToProfile('1478')
  }

  const result = true

  const unfollowUserHandler = () => {
    setOpenUnfollowModal(false)
  }
  const followUserHandler = () => {}

  return (
    <>
      <div className={s.infoWrapper}>
        <AvatarWithUserName navigateToProfile={navigateToProfileHandler} />
        <div className={s.buttonsWrapper}>
          <Button
            onClick={result ? () => setOpenUnfollowModal(true) : followUserHandler}
            variant={result ? 'outline' : 'primary'}
          >
            {result
              ? t.profile.info.stats.following.unFollow
              : t.profile.info.stats.following.follow}
          </Button>
        </div>
      </div>
      <ActionConfirmationModal
        headerTitle={t.profile.info.stats.following.unFollow}
        isOpenModal={openUnfollowModal}
        modalTextChildren={`${t.profile.info.stats.following.modalText}${userName}`}
        negativeButtonChildren={t.profile.info.stats.following.no}
        onClickPositiveButton={unfollowUserHandler}
        positiveButtonChildren={t.profile.info.stats.following.yes}
        setIsOpenModal={setOpenUnfollowModal}
      />
    </>
  )
}
