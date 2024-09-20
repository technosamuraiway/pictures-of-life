import { useState } from 'react'
import { toast } from 'react-toastify'

import { ActionConfirmationModal, AddProfilePhotoModal } from '@/entities'
import { useDeleteAvatarMutation } from '@/services/flow/profile.service'
import { RequestLineLoader, RoundAvatar, useRouterLocaleDefinition } from '@/shared'

interface IProps {
  avatar?: string
}

export const ChangeAvatar = ({ avatar }: IProps) => {
  const t = useRouterLocaleDefinition()
  const [addAvatarBtn, setAddAvatarBtn] = useState<boolean>(true)
  const [deleteAvatarBtn, setDeleteAvatarBtn] = useState<boolean>(true)

  const [openDeleteAvatarModal, setOpenDeleteAvatarModal] = useState<boolean>(false)
  const [openAddAvatarModal, setOpenAddAvatarModal] = useState<boolean>(false)

  const [deleteAvatar, { isLoading: deleteAvatarIsLoading }] = useDeleteAvatarMutation()

  const deleteAvatarModalHandler = () => {
    setOpenDeleteAvatarModal(true)
  }

  const confirmDeleteAvatarHandler = async () => {
    await deleteAvatar().unwrap()
    toast.success(t.avatarChange.deleteAvatarSuccess)

    setOpenDeleteAvatarModal(false)
  }

  const addAvatarModalHandler = () => {
    setOpenAddAvatarModal(true)
  }

  return (
    <>
      {deleteAvatarIsLoading && <RequestLineLoader />}
      <RoundAvatar
        addAvatarBtnText={t.avatarChange.addAvatarButton}
        avatarAltText={t.avatarChange.avatarImgAltText}
        avatarSrc={avatar}
        isShowAddBtn={addAvatarBtn}
        isShowDeleteBtn={!!avatar}
        onClickAddAvatar={addAvatarModalHandler}
        onClickDeleteAvatar={deleteAvatarModalHandler}
      />
      <ActionConfirmationModal
        headerTitle={t.avatarChange.deleteAvatarModalHeader}
        isOpenModal={openDeleteAvatarModal}
        modalTextChildren={t.avatarChange.deleteAvatarModalText}
        negativeButtonChildren={t.avatarChange.deleteAvatarModalButtonNo}
        onClickPositiveButton={confirmDeleteAvatarHandler}
        positiveButtonChildren={t.avatarChange.deleteAvatarModalButtonYes}
        setIsOpenModal={setOpenDeleteAvatarModal}
      />
      <AddProfilePhotoModal onOpenModal={setOpenAddAvatarModal} openModal={openAddAvatarModal} />
    </>
  )
}
