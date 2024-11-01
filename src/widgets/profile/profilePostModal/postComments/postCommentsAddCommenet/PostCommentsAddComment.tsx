import React, { memo } from 'react'
import { useForm } from 'react-hook-form'

import { ControlledTextField } from '@/entities'
import { useRouterLocaleDefinition } from '@/shared'
import { Typography } from '@technosamurai/techno-ui-kit'

import s from './PostCommentsAddComment.module.scss'

export type Form = {
  text: string
}

interface IProps {
  onFormSubmit: (data: Form) => Promise<void>
}

export const PostCommentsAddComment = memo(({ onFormSubmit }: IProps) => {
  const t = useRouterLocaleDefinition()

  const { control, handleSubmit } = useForm<Form>({
    defaultValues: {
      text: '',
    },
  })

  return (
    <form className={s.root} noValidate onSubmit={handleSubmit(onFormSubmit)}>
      <ControlledTextField control={control} />
      <Typography as={'button'} className={s.button} typeof={'submit'} variant={'bold-text-16'}>
        {t.profile.modal.addComment}
      </Typography>
    </form>
  )
})
