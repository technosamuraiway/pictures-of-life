import { useState } from 'react'

import { ActionConfirmationModal, AddProfilePhotoModal } from '@/entities'
import TermsOfService from '@/pages/auth/termsofservice'
import { AdaptiveTranslation, useRouterLocaleDefinition } from '@/shared'
import { getBaseLayout, getLayoutWithNav } from '@/widgets'
import emptyAvatar from '@public/profileAvatar/emptyAvatar.svg'
import { Button, Modal, Typography } from '@technosamurai/techno-ui-kit'
import Image from 'next/image'

import s from './AvatarTestComponent.module.scss'

function AvatarTestComponent() {
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

  const onClickOpenAddAvatarModal = () => {
    setOpenAddAvatarModal(true)
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
        <Button fullWidth onClick={onClickOpenAddAvatarModal} variant={'outline'}>
          {t.avatarChange.addAvatarButton}
        </Button>
      </div>
      {/*Модалка удалить аватар*/}
      <ActionConfirmationModal
        headerTitle={t.avatarChange.deleteAvatarModalHeader}
        isOpenModal={openDeleteAvatarModal}
        modalTextChildren={t.avatarChange.deleteAvatarModalText}
        negativeButtonChildren={t.avatarChange.deleteAvatarModalButtonNo}
        onClickPositiveButton={onClickYesButtonDeleteAvatarModal}
        positiveButtonChildren={t.avatarChange.deleteAvatarModalButtonYes}
        setIsOpenModal={setOpenDeleteAvatarModal}
      />
      {/*Модалка изменить аватар*/}
      <AddProfilePhotoModal onOpenModal={setOpenAddAvatarModal} openModal={openAddAvatarModal} />
    </>
  )
}

AvatarTestComponent.getLayout = getLayoutWithNav
export default AvatarTestComponent
