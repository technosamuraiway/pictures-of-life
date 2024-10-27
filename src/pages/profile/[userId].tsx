import { useMemo } from 'react'

import { InitLoader, MetaHead } from '@/shared'
import {
  InfoPanel,
  PostsAssociativeArray,
  PostsShower,
  ProfilePostModal,
  getLayoutWithNav,
  useGetProfilePageData,
} from '@/widgets'
import { useRouter } from 'next/router'

function Profile() {
  const { query } = useRouter()

  const {
    isOwnProfile,
    isPostsLoading,
    isProfileLoading,
    isUserDataLoading,
    loadMorePosts,
    postsData,
    profileData,
    userData,
  } = useGetProfilePageData(query.userId as string)

  // кешированный массив постов
  const postsArray = useMemo(
    () => postsData?.items.map(item => ({ id: item.id, images: item.images })) || [],
    [postsData]
  )

  // кешированный ассоциативный массив
  const postsAssociativeArray = useMemo(() => {
    return (
      postsData?.items.reduce((acc, post) => {
        acc[post.id] = post.images

        return acc
      }, {} as PostsAssociativeArray) || {}
    )
  }, [postsData])

  if (isProfileLoading || isPostsLoading || isUserDataLoading) {
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

      <button onClick={loadMorePosts} type={'button'}>
        REFETCH
      </button>

      <PostsShower posts={postsArray} />

      <ProfilePostModal postsAssociativeArray={postsAssociativeArray} />
    </>
  )
}

Profile.getLayout = getLayoutWithNav
export default Profile
