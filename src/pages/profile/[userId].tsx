import { useMemo } from 'react'

import { InfoPanel, PostsShower } from '@/pages/profile/_ui'
import {
  IPostImage,
  useAppSelector,
  useGetProfileQuery,
  useGetUserPublicPostsQuery,
} from '@/services'
import { meSelectorData } from '@/services/selectors/auth.selectors'
import { InitLoader, MetaHead } from '@/shared'
import { getLayoutWithNav } from '@/widgets'
import { useRouter } from 'next/router'

function Profile() {
  const {
    query: { userId },
  } = useRouter()
  const meRequestData = useAppSelector(meSelectorData)

  const { data: profileData, isLoading: isProfileLoading } = useGetProfileQuery(undefined, {
    skip: !meRequestData,
  })

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

  if (isProfileLoading || isPostsLoading) {
    return <InitLoader />
  }

  return (
    <>
      <MetaHead title={'Profile info'} />

      <InfoPanel
        about={profileData?.aboutMe || 'no info'}
        avatar={profileData?.avatars[0].url || ''}
        userName={profileData?.userName || 'no info'}
      />

      <PostsShower posts={postsImagesArray} />
    </>
  )
}

Profile.getLayout = getLayoutWithNav
export default Profile
