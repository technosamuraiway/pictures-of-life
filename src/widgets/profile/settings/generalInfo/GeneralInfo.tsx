import React, { useState } from 'react'
import { toast } from 'react-toastify'

import { ProfileForm } from '@/entities/profile/generalInfo/ProfileForm'
import { ProfileFormValues, useGetProfileQuery, useUpdateProfileMutation } from '@/services'
import { RequestLineLoader, useRouterLocaleDefinition } from '@/shared'
import { Tabs } from '@technosamurai/techno-ui-kit'

import s from './GeneralInfo.module.scss'

import { ChangeAvatar } from './changeAvatar/ChangeAvatar'

const formatDateString = (dateString: string | undefined): string => {
  if (!dateString) {
    return ''
  }

  const [month, day, year] = dateString.split('/').map(Number)

  const date = new Date(year, month - 1, day)

  return isNaN(date.getTime()) ? '' : date.toISOString() // Ensure it returns a string
}

export const GeneralInfo = () => {
  const t = useRouterLocaleDefinition()
  const { data: profileData, isLoading: getProfileIsLoading } = useGetProfileQuery()
  const [updateProfile, { isLoading: updateProfileIsloading }] = useUpdateProfileMutation()
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const defaultValues = {
    aboutMe: profileData?.aboutMe || '',
    city: profileData?.city || '',
    country: profileData?.country || '',
    dateOfBirth: profileData?.dateOfBirth
      ? new Date(profileData.dateOfBirth).toLocaleDateString('en-US')
      : '',
    firstName: profileData?.firstName || '',
    lastName: profileData?.lastName || '',
    region: profileData?.region || '',
    userName: profileData?.userName || '',
  }
  const onSubmitProfileForm = async (data: ProfileFormValues, reset: () => void) => {
    const formattedData = {
      ...data,
      dateOfBirth: data.dateOfBirth ? formatDateString(data.dateOfBirth) : new Date().toISOString(),
    }

    await updateProfile(formattedData).unwrap()
    toast.success(t.settingsPage.updateProfileSuccess)

    setButtonDisabled(false)
  }

  return (
    <>
      {getProfileIsLoading || (updateProfileIsloading && <RequestLineLoader />)}
      <Tabs.Content className={s.generalDiv} value={t.settingsPage.general}>
        <ChangeAvatar />
        <ProfileForm
          buttonDisabled={buttonDisabled || !profileData}
          defaultValues={defaultValues}
          onSubmitProfileForm={(data, reset) => onSubmitProfileForm(data, reset)}
        />
        <div className={s.lineDiv}></div>
      </Tabs.Content>
    </>
  )
}
