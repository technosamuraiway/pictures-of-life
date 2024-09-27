import { toast } from 'react-toastify'

import { ProfileForm } from '@/entities'
import { ProfileFormValues, useUpdateProfileMutation } from '@/services'
import { RequestLineLoader, useRouterLocaleDefinition } from '@/shared'
import { Tabs } from '@technosamurai/techno-ui-kit'

import s from './GeneralInfo.module.scss'

import { ChangeAvatar } from './changeAvatar/ChangeAvatar'

export const GeneralInfo = () => {
  const t = useRouterLocaleDefinition()

  const [updateProfile, { isLoading: updateProfileIsLoading }] = useUpdateProfileMutation()

  const onSubmitProfileFormHandler = async (data: ProfileFormValues) => {
    await updateProfile(data).unwrap()
    toast.success(t.settingsPage.updateProfileSuccess)
  }

  return (
    <>
      {updateProfileIsLoading && <RequestLineLoader />}
      <Tabs.Content className={s.generalDiv} value={t.settingsPage.general}>
        <ChangeAvatar />
        <ProfileForm
          buttonDisabled={updateProfileIsLoading}
          onSubmitProfileForm={onSubmitProfileFormHandler}
        />
        <div className={s.lineDiv}></div>
      </Tabs.Content>
    </>
  )
}
