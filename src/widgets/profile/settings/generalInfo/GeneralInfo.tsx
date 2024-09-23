import { useGetProfileQuery } from '@/services'
import { RequestLineLoader, useRouterLocaleDefinition } from '@/shared'
import { Tabs } from '@technosamurai/techno-ui-kit'

import { ChangeAvatar } from './changeAvatar/ChangeAvatar'

export const GeneralInfo = () => {
  const t = useRouterLocaleDefinition()
  const { data: profileData, isLoading: getProfileIsLoading } = useGetProfileQuery()

  return (
    <>
      {getProfileIsLoading && <RequestLineLoader />}
      <Tabs.Content value={t.settingsPage.general}>
        <ChangeAvatar />
      </Tabs.Content>
    </>
  )
}