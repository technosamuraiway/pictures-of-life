import { useState } from 'react'
import { toast } from 'react-toastify'

import { ActionConfirmationModal, AddProfilePhotoModal } from '@/entities'
import { useDeleteAvatarMutation } from '@/services'
import { RequestLineLoader, RoundAvatar, useRouterLocaleDefinition } from '@/shared'

import s from './ChangeAvatar.module.scss'

export const ChangeAvatar = () => {
  const t = useRouterLocaleDefinition()

  const [openDeleteAvatarModal, setOpenDeleteAvatarModal] = useState<boolean>(false)
  const [openAddAvatarModal, setOpenAddAvatarModal] = useState<boolean>(false)

  const [deleteAvatar, { isLoading: deleteAvatarIsLoading }] = useDeleteAvatarMutation()

  const deleteAvatarModalHandler = () => {
    setOpenDeleteAvatarModal(true)
  }

  const confirmDeleteAvatarHandler = async () => {
    await deleteAvatar().unwrap()
    toast.success(t.avatarChange.deleteAvatar.deleteAvatarSuccess)

    setOpenDeleteAvatarModal(false)
  }

  const addAvatarModalHandler = () => {
    setOpenAddAvatarModal(true)
  }

  return (
    <div className={s.wrapper}>
      {deleteAvatarIsLoading && <RequestLineLoader />}
      <RoundAvatar
        addAvatarBtnText={t.avatarChange.addAvatar.addAvatarButton}
        isShowAddBtn
        onClickAddAvatar={addAvatarModalHandler}
        onClickDeleteAvatar={deleteAvatarModalHandler}
      />
      <ActionConfirmationModal
        headerTitle={t.avatarChange.deleteAvatar.deleteAvatarModalHeader}
        isOpenModal={openDeleteAvatarModal}
        modalTextChildren={t.avatarChange.deleteAvatar.deleteAvatarModalText}
        negativeButtonChildren={t.avatarChange.deleteAvatar.deleteAvatarModalButtonNo}
        onClickPositiveButton={confirmDeleteAvatarHandler}
        positiveButtonChildren={t.avatarChange.deleteAvatar.deleteAvatarModalButtonYes}
        setIsOpenModal={setOpenDeleteAvatarModal}
      />
      <AddProfilePhotoModal onOpenModal={setOpenAddAvatarModal} openModal={openAddAvatarModal} />
    </div>
  )
}
