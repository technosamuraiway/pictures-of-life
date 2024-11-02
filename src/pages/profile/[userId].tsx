import { InitLoader, MetaHead } from '@/shared'
import {
  InfoPanel,
  PostsShower,
  ProfilePostModal,
  getLayoutWithNav,
  useProfilePage,
} from '@/widgets'

function Profile() {
  const {
    isOwnProfile,
    isProfileLoading,
    isUserDataLoading,
    postsArray,
    postsAssociativeArray,
    profileData,
    ref,
    userData,
  } = useProfilePage()

  if (isProfileLoading || isUserDataLoading) {
    return <InitLoader />
  }

  return (
    <>
      <MetaHead title={'Profile info'} />

      <InfoPanel
        about={profileData?.aboutMe || 'no info'}
        avatar={profileData?.avatars[0].url || ''}
        isWithSettingsBtn={isOwnProfile}
        userFollowers={userData?.followersCount || 999}
        userFollowing={userData?.followingCount || 999}
        userName={profileData?.userName || 'no info'}
        userPublications={userData?.publicationsCount || 999}
      />

      <PostsShower posts={postsArray} />

      <div ref={ref} style={{ height: '20px', width: '100%' }} />

      <ProfilePostModal postsAssociativeArray={postsAssociativeArray} />
    </>
  )
}

Profile.getLayout = getLayoutWithNav
export default Profile
