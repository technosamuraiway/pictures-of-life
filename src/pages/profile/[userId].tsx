import { useMemo } from 'react'

import { InitLoader, MetaHead } from '@/shared'
import {
  InfoPanel,
  PostWithId,
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
    postsData,
    profileData,
    userData,
  } = useGetProfilePageData(query.userId as string)

  // кешированный массив постов
  const postsArray = useMemo(() => {
    return postsData?.items.reduce((acc, post) => {
      acc.push({ id: post.id, images: post.images })

      return acc
    }, [] as PostWithId[])
  }, [postsData])

  // кешированный ассоциативный массив
  const postsAssociativeArray = useMemo(() => {
    return postsData?.items.reduce((acc, post) => {
      acc[post.id] = post.images

      return acc
    }, {} as PostsAssociativeArray)
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
        userFollowers={userData?.followersCount || 0}
        userFollowing={userData?.followingCount || 0}
        userName={profileData?.userName || 'no info'}
        userPublications={userData?.publicationsCount || 0}
      />

      <PostsShower posts={postsArray} />

      <ProfilePostModal postsAssociativeArray={postsAssociativeArray ?? {}} />
    </>
  )
}

Profile.getLayout = getLayoutWithNav
export default Profile
