import { useState } from 'react'
import { toast } from 'react-toastify'

import { ActionConfirmationModal } from '@/entities'
import { PostWithoutHeaderModal } from '@/entities/modals/postWithoutHeaderModal/PostWithoutHeaderModal'
import { PATH, useRouterLocaleDefinition } from '@/shared'
import { Modal } from '@technosamurai/techno-ui-kit'
import { useRouter } from 'next/router'

import s from './EditPostPhotoModal.module.scss'

interface IProps {
  image: (File | string)[]
  onOpen: boolean
  setOnOpen: (onOpen: boolean) => void
}

export const EditPostPhotoModal = ({ image, onOpen, setOnOpen }: IProps) => {
  const t = useRouterLocaleDefinition()

  return (
    <PostWithoutHeaderModal
      headerTitle={t.createNewPost.editPhotoModal.modalTitle}
      onOpen={onOpen}
      setOnOpen={setOnOpen}
    >
      Hello
    </PostWithoutHeaderModal>
  )
}
