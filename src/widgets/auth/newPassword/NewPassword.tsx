import React from 'react'
import { toast } from 'react-toastify'

import { CreateNewPasswordForm, CreateNewPasswordFormValues } from '@/entities'
import { useCreateNewPasswordMutation } from '@/services'
import { MetaHead, PATH, RequestLineLoader, useRouterLocaleDefinition } from '@/shared'
import { Card, Typography } from '@technosamurai/techno-ui-kit'
import { useRouter } from 'next/router'

import s from './NewPassword.module.scss'

export const NewPassword = () => {
  const t = useRouterLocaleDefinition()
  const { query, replace } = useRouter()

  const [createNewPassword, { isLoading: createNewPasswordIsLoading }] =
    useCreateNewPasswordMutation()

  const createNewPasswordSubmitHandler = (data: CreateNewPasswordFormValues) => {
    if (query.code) {
      createNewPassword({ newPassword: data.newPassword, recoveryCode: query.code }).unwrap()
      toast.success(t.newPasswordPage.successMessage)

      replace(PATH.AUTH.SIGNIN)
    }
  }

  return (
    <>
      {createNewPasswordIsLoading && <RequestLineLoader />}
      <MetaHead title={t.newPasswordPage.title} />
      <Card className={s.wrapper}>
        <Typography className={s.mainTitle} variant={'h1'}>
          {t.newPasswordPage.title}
        </Typography>
        <CreateNewPasswordForm
          isButtonDisabled={createNewPasswordIsLoading}
          onSubmitCreateNewPasswordForm={createNewPasswordSubmitHandler}
        />
      </Card>
    </>
  )
}
