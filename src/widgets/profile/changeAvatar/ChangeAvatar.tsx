import { useState } from 'react'
import { toast } from 'react-toastify'

import { ActionConfirmationModal, AddProfilePhotoModal } from '@/entities'
import { useDeleteAvatarMutation } from '@/services/flow/profile.service'
import { RequestLineLoader, RoundAvatar, useRouterLocaleDefinition } from '@/shared'

export const ChangeAvatar = () => {
  const t = useRouterLocaleDefinition()
  const [addAvatarBtn, setAddAvatarBtn] = useState<boolean>(true)
  const [deleteAvatarBtn, setDeleteAvatarBtn] = useState<boolean>(true)
  const [openDeleteAvatarModal, setOpenDeleteAvatarModal] = useState(false)
  const [openAddAvatarModal, setOpenAddAvatarModal] = useState(false)

  const [deleteAvatar, { isLoading: deleteAvatarIsLoading }] = useDeleteAvatarMutation()

  const deleteAvatarHandler = () => {
    setOpenDeleteAvatarModal(true)
  }

  const confirmDeleteAvatarModalHandler = async () => {
    await deleteAvatar().unwrap()
    toast.success(t.avatarChange.deleteAvatarSuccess)

    setOpenDeleteAvatarModal(false)
  }

  const addAvatarHandler = () => {
    setOpenAddAvatarModal(true)
  }

  return (
    <>
      {deleteAvatarIsLoading && <RequestLineLoader />}
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
