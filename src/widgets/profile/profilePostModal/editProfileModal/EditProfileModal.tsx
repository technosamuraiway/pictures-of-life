import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { IPostImage, useChangePostDescriptionMutation } from '@/services'
import { useGetPublicPostByIdQuery } from '@/services/flow/publicPosts.service'
import { CircleAvatar, RequestLineLoader, useRouterLocaleDefinition } from '@/shared'
import { ConfirmationModal } from '@/widgets/profile/components/confirmationModal/confirmationModal'
import { PostsItem } from '@/widgets/profile/components/postsItem/PostsItem'
import {
  EditProfileModalValidation,
  editProfileModalValidation,
} from '@/widgets/profile/profilePostModal/editProfileModal/editProfileModal.validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Modal, TextArea, Typography } from '@technosamurai/techno-ui-kit'
import clsx from 'clsx'

import s from './EditProfileModal.module.scss'

import { useEditProfileModalStore } from './useEditProfileModalStore'

interface IProps {
  images: IPostImage[]
  postId: string
}

export const EditProfileModal = ({ images, postId }: IProps) => {
  const t = useRouterLocaleDefinition()
  const { isOpen, onChange } = useEditProfileModalStore()
  const { data: post, isLoading: isPostLoading } = useGetPublicPostByIdQuery(postId)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [changeDescription, { isLoading: isChangeDescriptionLoading }] =
    useChangePostDescriptionMutation()

  const {
    formState: { isSubmitting, isValid },
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
  } = useForm<EditProfileModalValidation>({
    defaultValues: {
      description: '',
    },
    mode: 'onChange',
    resolver: zodResolver(editProfileModalValidation),
  })

  const description = watch('description')
  const descriptionLength = description.length

  const isDisabled = isSubmitting || !isValid
  const isLoading = isPostLoading || isChangeDescriptionLoading

  useEffect(() => {
    if (post) {
      setValue('description', post?.description)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post])

  async function onFormSubmitHandler(data: EditProfileModalValidation) {
    try {
      await changeDescription({ description: data.description, postId: Number(postId) }).unwrap()
      onChange(false)
      reset()
      toast.success(t.profile.modal.headerDropdownOwnDotsMenu.editDescription.successChange)
    } catch (error) {
      toast.error(t.profile.modal.headerDropdownOwnDotsMenu.editDescription.errorChange)
    }
  }

  function closeModal() {
    if (description !== post?.description) {
      setIsConfirmModalOpen(true)
    } else {
      onChange(false)
      reset()
    }
  }

  const editPostForm = (
    <form
      autoComplete={'off'}
      className={s.editPostForm}
      noValidate
      onSubmit={handleSubmit(onFormSubmitHandler)}
    >
      <div className={s.user}>
        <CircleAvatar src={post?.avatarOwner || ''} />
        <Typography className={s.username} variant={'bold-text-14'}>
          {post?.userName}
        </Typography>
      </div>
      <div className={s.description}>
        <TextArea
          {...register('description')}
          textAreaLabelText={
            t.profile.modal.headerDropdownOwnDotsMenu.editDescription.descriptionTitle
          }
        />
        <Typography
          className={clsx(s.symbolsNumber, descriptionLength > 500 && s.symbolsNumberError)}
          variant={'small-text'}
        >
          {descriptionLength}/500
        </Typography>
      </div>
      <Button className={s.submitBtn} disabled={isDisabled} type={'submit'}>
        {t.profile.modal.headerDropdownOwnDotsMenu.editDescription.saveChanges}
      </Button>
    </form>
  )

  return (
    <>
      <Modal
        contentClassName={s.root}
        headerTitle={t.profile.modal.headerDropdownOwnDotsMenu.editDescription.headerTitle}
        modalSize={'XL'}
        onOpenChange={closeModal}
        open={isOpen}
        overlayClassName={s.confirmationModalOverlay}
      >
        <>
          {isLoading && <RequestLineLoader />}

          <div className={s.content}>
            <PostsItem
              images={images}
              imgHeight={501}
              imgWidth={490}
              postId={Number(postId)}
              rootCN={s.postsItem}
            />
            {editPostForm}
          </div>
        </>
      </Modal>

      {/* close with confirmation */}
      <ConfirmationModal
        cbOnConfirm={async () => onChange(false)}
        confirmMessage={t.profile.modal.headerDropdownOwnDotsMenu.editDescription.confirm}
        headerTitle={t.profile.modal.headerDropdownOwnDotsMenu.editDescription.headerTitle}
        isCloseToPrevious
        onOpenChange={setIsConfirmModalOpen}
        open={isConfirmModalOpen}
        overlayClassName={s.confirmationModalOverlay}
      />
    </>
  )
}
