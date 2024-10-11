import { API } from '@/services/api-SSG/inctagram-SSG.api'
import { MetaHead, useRouterLocaleDefinition } from '@/shared'
import { getLayoutWithNav } from '@/widgets'

function Profile() {
  const t = useRouterLocaleDefinition()

  const fetchProfile = async () => {
    try {
      const res = await API.profileAPI.getProfile()

      return res
    } catch (err) {
      console.error('Error fetching profile:', err)
    }
  }

  // const { data: profileData, isLoading: getProfileIsLoading } = useGetProfileQuery()

  return (
    <>
      {/*{getProfileIsLoading && <RequestLineLoader />}*/}
      <MetaHead title={t.profilePage.title} />
      <button onClick={fetchProfile}>REQUEST</button>
      <div>1</div>
    </>
  )
}

Profile.getLayout = getLayoutWithNav
export default Profile
