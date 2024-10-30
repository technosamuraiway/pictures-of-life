import { InitLoader, MetaHead, RequestLineLoader } from '@/shared'
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
    isPostsLoading,
    isPostsLoadingInitial,
    isPostsLoadingWithScroll,
    isProfileLoading,
    isUserDataLoading,
    postsArray,
    postsAssociativeArray,
    profileData,
    ref,
    userData,
  } = useProfilePage()

  // !при scroll-posts-fetching => isPostsLoading все ровно false
  if (isProfileLoading || isUserDataLoading || isPostsLoading || isPostsLoadingInitial) {
    return <InitLoader />
  }

  return (
    <>
      <MetaHead title={'Profile info'} />

      {isPostsLoadingWithScroll && <RequestLineLoader />}

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
