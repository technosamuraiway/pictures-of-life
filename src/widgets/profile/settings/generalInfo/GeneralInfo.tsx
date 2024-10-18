import { toast } from 'react-toastify'

import { ProfileForm } from '@/entities'
import { ProfileFormValues, useGetProfileQuery, useUpdateProfileMutation } from '@/services'
import { InitLoader, RequestLineLoader, useRouterLocaleDefinition } from '@/shared'
import { Tabs } from '@technosamurai/techno-ui-kit'

import s from './GeneralInfo.module.scss'

import { ChangeAvatar } from './changeAvatar/ChangeAvatar'

interface IProps {
  value: string
}

export const GeneralInfo = ({ value }: IProps) => {
  const t = useRouterLocaleDefinition()

  const [updateProfile, { isLoading: updateProfileIsLoading }] = useUpdateProfileMutation()
  const { isLoading: isProfileLoading } = useGetProfileQuery()
  const onSubmitProfileFormHandler = async (data: ProfileFormValues) => {
    await updateProfile(data).unwrap()
    toast.success(t.settingsPage.updateProfileSuccess)
  }

  return (
    <>
      {updateProfileIsLoading && <RequestLineLoader />}
      <Tabs.Content className={s.generalDiv} value={value}>
        {isProfileLoading ? (
          <InitLoader />
        ) : (
          <>
            <ChangeAvatar />
            <ProfileForm
              buttonDisabled={updateProfileIsLoading}
              onSubmitProfileForm={onSubmitProfileFormHandler}
            />
            <div className={s.lineDiv}></div>
          </>
        )}
      </Tabs.Content>
    </>
  )
}
