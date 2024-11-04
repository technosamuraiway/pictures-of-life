import { toast } from 'react-toastify'

import { ProfileForm, ProfileFormValues } from '@/entities'
import { useGetProfileQuery, useUpdateProfileMutation } from '@/services'
import { InitLoader, RequestLineLoader, useRouterLocaleDefinition } from '@/shared'
import { Tabs } from '@technosamurai/techno-ui-kit'

import s from './GeneralInfo.module.scss'

import { ChangeAvatar } from './changeAvatar/ChangeAvatar' // Import the correct type

interface IProps {
  value: string
}

export const GeneralInfo = ({ value }: IProps) => {
  const t = useRouterLocaleDefinition()

  const [updateProfile, { isLoading: updateProfileIsLoading }] = useUpdateProfileMutation()
  const { isLoading: isProfileLoading } = useGetProfileQuery()

  const onSubmitProfileFormHandler = async (data: ProfileFormValues) => {
    const formattedData = {
      ...data,
      dateOfBirth: data.dateOfBirth ? data.dateOfBirth.toISOString() : undefined,
    }

    await updateProfile(formattedData).unwrap()
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
