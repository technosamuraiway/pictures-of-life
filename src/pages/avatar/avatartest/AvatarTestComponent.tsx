import { useState } from 'react'

import { AdaptiveTranslation, useRouterLocaleDefinition } from '@/shared'
import emptyAvatar from '@public/profileAvatar/emptyAvatar.svg'
import { Button, Modal, Typography } from '@technosamurai/techno-ui-kit'
import Image from 'next/image'

import s from './AvatarTestComponent.module.scss'

export default function AvatarTestComponent() {
  const t = useRouterLocaleDefinition()

  const [showOpenDeleteAvatarModal, setShowOpenDeleteAvatarModal] = useState(true)
  const [openDeleteAvatarModal, setOpenDeleteAvatarModal] = useState(false)
  const [openAddAvatarModal, setOpenAddAvatarModal] = useState(false)

  const onClickOpenDeleteAvatarModal = () => {
    setOpenDeleteAvatarModal(true)
  }

  const onClickYesButtonDeleteAvatarModal = () => {
    setOpenDeleteAvatarModal(false)
  }

  const onClickNoButtonDeleteAvatarModal = () => {
    setOpenDeleteAvatarModal(false)
  }

  const onClickOpenAddAvatarModal = () => {
    setOpenAddAvatarModal(true)
  }

  const errorType = true
  const modalErrorText = errorType ? t.avatarChange.errorFormatText : t.avatarChange.errorSizeText

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
        <Button fullWidth onClick={onClickOpenAddAvatarModal} variant={'outline'}>
          {t.avatarChange.addAvatarButton}
        </Button>
      </div>
      {/*Модалка удалить аватар*/}
      <Modal
        headerTitle={t.avatarChange.deleteAvatarModalHeader}
        onOpenChange={setOpenDeleteAvatarModal}
        open={openDeleteAvatarModal}
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
      {/*Модалка изменить аватар*/}
      <Modal
        headerTitle={t.avatarChange.addAvatarModalHeader}
        onOpenChange={setOpenAddAvatarModal}
        open={openAddAvatarModal}
      >
        <div className={s.addAvatarModalWrapper}>
          <div className={s.errorWrapper}>
            <Typography variant={'regular-text-14'}>
              <AdaptiveTranslation
                tags={{
                  1: () => (
                    <Typography className={s.errorText} variant={'bold-text-14'}>
                      {t.avatarChange.errorText}
                    </Typography>
                  ),
                }}
                text={modalErrorText}
              />
            </Typography>
          </div>
          <div className={s.addAvatarImgWrapper}>
            <Image
              alt={t.avatarChange.avatarImgAltText}
              className={s.avatarImg}
              src={emptyAvatar}
            />
          </div>
          <Button className={s.addAvatarButton} variant={'primary'}>
            {t.avatarChange.addAvatarModalButtonText}
          </Button>
        </div>
      </Modal>
    </>
  )
}
