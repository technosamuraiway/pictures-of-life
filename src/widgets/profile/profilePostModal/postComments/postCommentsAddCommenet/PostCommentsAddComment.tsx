import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { useRouterLocaleDefinition } from '@/shared'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextField, Typography } from '@technosamurai/techno-ui-kit'
import clsx from 'clsx'

import s from './PostCommentsAddComment.module.scss'

import {
  PostCommentFormZodSchema,
  postCommentFormZodSchema,
} from '../../../lib/zod/postCommentsFormZodSchema'

interface IProps {
  onCommentChange: (hasComment: boolean) => void
  onFormSubmit: (data: PostCommentFormZodSchema) => Promise<void>
}

export const PostCommentsAddComment = ({ onCommentChange, onFormSubmit }: IProps) => {
  const t = useRouterLocaleDefinition()

  const {
    formState: { isDirty, isSubmitting },
    handleSubmit,
    register,
    reset,
    watch,
  } = useForm<PostCommentFormZodSchema>({
    defaultValues: {
      comment: '',
    },
    resolver: zodResolver(postCommentFormZodSchema),
  })

  async function onFormSubmitHandler(data: PostCommentFormZodSchema) {
    onFormSubmit(data).then(() => reset())
  }

  const comment = watch('comment')

  useEffect(() => {
    onCommentChange(comment.trim().length > 0)
  }, [comment, onCommentChange])

  const isBtnDisabled = isSubmitting || !isDirty

  return (
    <form
      autoComplete={'off'}
      className={s.root}
      noValidate
      onSubmit={handleSubmit(onFormSubmitHandler)}
    >
      <TextField
        placeholder={`${t.profile.modal.commentPlaceholder}...`}
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
  )
}
