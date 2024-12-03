import { useState } from 'react'

import { ActionConfirmationModal } from '@/entities'
import { AvatarWithUserName, useRouterLocaleDefinition } from '@/shared'
import { Button } from '@technosamurai/techno-ui-kit'

import s from './FollowerItem.module.scss'

interface IProps {
  navigateToProfile: (id: string) => void
  userName: string
}

export const FollowerItem = ({ navigateToProfile, userName }: IProps) => {
  const t = useRouterLocaleDefinition()
  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  const navigateToProfileHandler = () => {
    navigateToProfile('1478')
  }

  const followUserHandler = () => {}
  const deleteFollowUserHandler = () => {
    setOpenDeleteModal(false)
  }

  return (
    <>
      <div className={s.infoWrapper}>
        <AvatarWithUserName navigateToProfile={navigateToProfileHandler} />
        <div className={s.buttonsWrapper}>
          <Button onClick={followUserHandler} variant={'primary'}>
            {t.profile.info.stats.followers.follow}
          </Button>
          <Button onClick={() => setOpenDeleteModal(true)} variant={'secondary'}>
            {t.profile.info.stats.followers.delete}
          </Button>
        </div>
      </div>
      <ActionConfirmationModal
        headerTitle={t.profile.info.stats.followers.deleteFollowing}
        isOpenModal={openDeleteModal}
        modalTextChildren={`${t.profile.info.stats.followers.modalText}${userName}`}
        negativeButtonChildren={t.profile.info.stats.followers.no}
        onClickPositiveButton={deleteFollowUserHandler}
        positiveButtonChildren={t.profile.info.stats.followers.yes}
        setIsOpenModal={setOpenDeleteModal}
      />
    </>
  )
}
