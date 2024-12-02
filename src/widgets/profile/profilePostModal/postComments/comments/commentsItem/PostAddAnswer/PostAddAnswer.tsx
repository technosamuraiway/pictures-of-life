import React from 'react'
import { useForm } from 'react-hook-form'

import { RequestLineLoader } from '@/shared'
import {
  PostCommentFormZodSchema,
  postCommentFormZodSchema,
} from '@/widgets/profile/lib/zod/postCommentsFormZodSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextField, Typography } from '@technosamurai/techno-ui-kit'
import clsx from 'clsx'

import s from '@/widgets/profile/profilePostModal/postComments/postCommentsAddCommenet/PostCommentsAddComment.module.scss'

type Props = {
  onFormSubmit: (data: PostCommentFormZodSchema) => Promise<unknown>
}

export const PostAddAnswer = ({ onFormSubmit }: Props) => {
  const {
    formState: { isDirty, isSubmitting, isValid },
    handleSubmit,
    register,
    reset,
  } = useForm<PostCommentFormZodSchema>({
    defaultValues: {
      comment: '',
    },
    resolver: zodResolver(postCommentFormZodSchema),
  })

  async function formSubmitHandler(data: PostCommentFormZodSchema) {
    await onFormSubmit(data)
    reset()
  }

  const isBtnDisabled = isSubmitting || !isDirty || !isValid

  return (
    <>
      {isSubmitting && <RequestLineLoader />}{' '}
      <form
        autoComplete={'off'}
        className={s.root}
        noValidate
        onSubmit={handleSubmit(formSubmitHandler)}
      >
        <TextField
          disabled={isSubmitting}
          // placeholder={`${t.profile.modal.commentPlaceholder}...`}
          {...register('comment')}
          inputClassName={s.input}
        />

        <Typography
          as={'button'}
          className={clsx(s.button, isBtnDisabled && s.buttonDisabled)}
          disabled={isBtnDisabled}
          type={'submit'}
          variant={'bold-text-16'}
        >
          {t.profile.modal.addComment}
        </Typography>
      </form>
    </>
  )
}
