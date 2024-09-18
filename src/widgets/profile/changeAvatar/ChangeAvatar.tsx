import { useState } from 'react'

import { ActionConfirmationModal, AddProfilePhotoModal } from '@/entities'
import { RoundAvatar, useRouterLocaleDefinition } from '@/shared'

export const ChangeAvatar = () => {
  const t = useRouterLocaleDefinition()
  const [addAvatarBtn, setAddAvatarBtn] = useState<boolean>(true)
  const [deleteAvatarBtn, setDeleteAvatarBtn] = useState<boolean>(true)
  const [openDeleteAvatarModal, setOpenDeleteAvatarModal] = useState(false)
  const [openAddAvatarModal, setOpenAddAvatarModal] = useState(false)

  const onClickDeleteAvatarHandler = () => {
    setOpenDeleteAvatarModal(true)
  }

  const onClickYesButtonDeleteAvatarModal = () => {
    setOpenDeleteAvatarModal(false)
  }

  const onClickAddAvatarHandler = () => {
    setOpenAddAvatarModal(true)
  }

  return (
    <>
      <RoundAvatar
        addAvatarBtnText={t.avatarChange.addAvatarButton}
        avatarAltText={t.avatarChange.avatarImgAltText}
        isShowAddBtn={addAvatarBtn}
        isShowDeleteBtn={deleteAvatarBtn}
        onClickAddAvatar={onClickAddAvatarHandler}
        onClickDeleteAvatar={onClickDeleteAvatarHandler}
      />
      <ActionConfirmationModal
        headerTitle={t.avatarChange.deleteAvatarModalHeader}
        isOpenModal={openDeleteAvatarModal}
        modalTextChildren={t.avatarChange.deleteAvatarModalText}
        negativeButtonChildren={t.avatarChange.deleteAvatarModalButtonNo}
        onClickPositiveButton={onClickYesButtonDeleteAvatarModal}
        positiveButtonChildren={t.avatarChange.deleteAvatarModalButtonYes}
        setIsOpenModal={setOpenDeleteAvatarModal}
      />
      <AddProfilePhotoModal onOpenModal={setOpenAddAvatarModal} openModal={openAddAvatarModal} />
    </>
  )
}
