import { useGetProfileQuery } from '@/services'
import { MetaHead, RequestLineLoader, useRouterLocaleDefinition } from '@/shared'
import { getLayoutWithNav } from '@/widgets'
import { Typography } from '@technosamurai/techno-ui-kit'

function Profile() {
  const t = useRouterLocaleDefinition()

  const { data: profileData, isLoading: getProfileIsLoading } = useGetProfileQuery()

  return (
    <>
      {getProfileIsLoading && <RequestLineLoader />}
      <MetaHead title={t.profilePage.title} />
      <div>It Is {profileData?.userName} profile</div>
      <Typography variant={'h2'}>id: {profileData?.id}</Typography>
    </>
  )
}

Profile.getLayout = getLayoutWithNav
export default Profile
