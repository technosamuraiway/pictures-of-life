import { useState } from 'react'

import { useGetProfileQuery } from '@/services'
import { MetaHead, PATH, RequestLineLoader, useRouterLocaleDefinition } from '@/shared'
import { getLayoutWithNav } from '@/widgets'
import { Button, Typography } from '@technosamurai/techno-ui-kit'

function Profile() {
  const t = useRouterLocaleDefinition()

  const { data: profileData, isLoading: getProfileIsLoading } = useGetProfileQuery()

  return (
    <>
      {getProfileIsLoading && <RequestLineLoader />}
      <MetaHead title={t.profilePage.title} />
      <div>It Is {profileData?.userName} profile</div>
      <Typography variant={'h2'}>id: {profileData?.id}</Typography>
      <Button as={'a'} href={PATH.PROFILE.SETTINGS} variant={'secondary'}>
        {t.profilePage.settingButton}
      </Button>
    </>
  )
}

Profile.isPrivate = true
Profile.getLayout = getLayoutWithNav
export default Profile
