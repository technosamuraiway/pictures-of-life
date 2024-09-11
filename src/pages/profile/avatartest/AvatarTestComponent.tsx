import { useState } from 'react'

import { useRouterLocaleDefinition } from '@/shared'
import emptyAvatar from '@public/profileAvatar/emptyAvatar.svg'
import { Button, Modal, Typography } from '@technosamurai/techno-ui-kit'
import Image from 'next/image'

import s from './AvatarTestComponent.module.scss'

export default function AvatarTestComponent() {
  const t = useRouterLocaleDefinition()

  const [showOpenDeleteAvatarModal, setShowOpenDeleteAvatarModal] = useState(true)
  const [openDeleteAvatarModal, setOpenDeleteAvatarModal] = useState(false)

  const onClickOpenDeleteAvatarModal = () => {
    setOpenDeleteAvatarModal(true)
  }

  const onClickYesButtonDeleteAvatarModal = () => {
    setOpenDeleteAvatarModal(false)
  }

  const onClickNoButtonDeleteAvatarModal = () => {
    setOpenDeleteAvatarModal(false)
  }

  return (
    <>
      <div className={s.avatarWrapper}>
        {showOpenDeleteAvatarModal && (
          <div className={s.deleteAvatarButtonWrapper}>
            <Button
              className={s.deleteAvatarButton}
              onClick={onClickOpenDeleteAvatarModal}
              variant={'iconButton'}
            >
              ✖
            </Button>
          </div>
        )}
        <div className={s.imgWrapper}>
          <Image alt={t.avatarChange.avatarImgAltText} className={s.avatarImg} src={emptyAvatar} />
        </div>
        <Button fullWidth variant={'outline'}>
          {t.avatarChange.addAvatarButton}
        </Button>
      </div>
      <Modal
        onOpenChange={setOpenDeleteAvatarModal}
        open={openDeleteAvatarModal}
        title={t.avatarChange.deleteAvatarModalHeader}
      >
        <div className={s.deleteAvatarModalWrapper}>
          <Typography variant={'regular-text-16'}>
            {t.avatarChange.deleteAvatarModalText}
          </Typography>
          <div className={s.deleteAvatarModalButtonsWrapper}>
            <Button
              className={s.deleteAvatarModalButton}
              onClick={onClickYesButtonDeleteAvatarModal}
              variant={'outline'}
            >
              {t.avatarChange.deleteAvatarModalButtonYes}
            </Button>
            <Button
              className={s.deleteAvatarModalButton}
              onClick={onClickNoButtonDeleteAvatarModal}
            >
              {t.avatarChange.deleteAvatarModalButtonNo}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
