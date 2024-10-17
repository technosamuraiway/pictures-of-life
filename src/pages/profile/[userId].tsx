import { useMemo } from 'react'

import {
  IPostImage,
  useAppSelector,
  useGetProfileQuery,
  useGetUserPublicPostsQuery,
} from '@/services'
import { useGetUserByUserNameQuery } from '@/services/flow/users.service'
import { meSelectorData } from '@/services/selectors/auth.selectors'
import { InitLoader, MetaHead } from '@/shared'
import { InfoPanel, PostsShower, getLayoutWithNav } from '@/widgets'
import { useRouter } from 'next/router'

function Profile() {
  const {
    query: { userId },
  } = useRouter()
  const meRequestData = useAppSelector(meSelectorData)

  const { data: profileData, isLoading: isProfileLoading } = useGetProfileQuery(undefined, {
    skip: !meRequestData,
  })

  const { data: userData, isLoading: isUserDataLoading } = useGetUserByUserNameQuery(
    profileData?.userName ?? '',
    { skip: !profileData }
  )

  const { data: postsData, isLoading: isPostsLoading } = useGetUserPublicPostsQuery(
    { userId: Number(userId) },
    { skip: !profileData }
  )

  // кешированный массив постов
  const postsImagesArray = useMemo(() => {
    return postsData?.items.reduce(
      (acc, post) => {
        acc.push(post.images)

        return acc
      },
      [] as Array<IPostImage[]>
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
        userFollowers={userData?.followersCount || 0}
        userFollowing={userData?.followingCount || 0}
        userName={profileData?.userName || 'no info'}
        userPublications={userData?.publicationsCount || 0}
      />

      <PostsShower posts={postsImagesArray} />
    </>
  )
}

Profile.getLayout = getLayoutWithNav
export default Profile
