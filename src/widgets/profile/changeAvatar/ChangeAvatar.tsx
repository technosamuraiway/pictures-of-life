import { useState } from 'react'

import { ActionConfirmationModal, AddProfilePhotoModal } from '@/entities'
import { RoundAvatar, useRouterLocaleDefinition } from '@/shared'

export const ChangeAvatar = () => {
  const t = useRouterLocaleDefinition()
  const [addAvatarBtn, setAddAvatarBtn] = useState<boolean>(true)
  const [deleteAvatarBtn, setDeleteAvatarBtn] = useState<boolean>(true)
  const [openDeleteAvatarModal, setOpenDeleteAvatarModal] = useState(false)
  const [openAddAvatarModal, setOpenAddAvatarModal] = useState(false)

  const deleteAvatarHandler = () => {
    setOpenDeleteAvatarModal(true)
  }

  const confirmDeleteAvatarModalHandler = () => {
    setOpenDeleteAvatarModal(false)
  }

  const addAvatarHandler = () => {
    setOpenAddAvatarModal(true)
  }

  return (
    <>
      <RoundAvatar
        addAvatarBtnText={t.avatarChange.addAvatarButton}
        avatarAltText={t.avatarChange.avatarImgAltText}
        isShowAddBtn={addAvatarBtn}
        isShowDeleteBtn={deleteAvatarBtn}
        onClickAddAvatar={addAvatarHandler}
        onClickDeleteAvatar={deleteAvatarHandler}
      />
      <ActionConfirmationModal
        headerTitle={t.avatarChange.deleteAvatarModalHeader}
        isOpenModal={openDeleteAvatarModal}
        modalTextChildren={t.avatarChange.deleteAvatarModalText}
        negativeButtonChildren={t.avatarChange.deleteAvatarModalButtonNo}
        onClickPositiveButton={confirmDeleteAvatarModalHandler}
        positiveButtonChildren={t.avatarChange.deleteAvatarModalButtonYes}
        setIsOpenModal={setOpenDeleteAvatarModal}
      />
      <AddProfilePhotoModal onOpenModal={setOpenAddAvatarModal} openModal={openAddAvatarModal} />
    </>
  )
}
