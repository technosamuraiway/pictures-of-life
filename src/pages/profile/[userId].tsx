import { IPostUser } from '@/services'
import { InitLoader, MetaHead, RequestLineLoader, useRouterLocaleDefinition } from '@/shared'
import {
  InfoPanel,
  PostsShower,
  ProfilePostModal,
  getLayoutWithNav,
  useProfilePage,
} from '@/widgets'
import { GetServerSideProps } from 'next'

interface IProps {
  post: IPostUser
  //user: GetPublicUserProfileByIdResponse
}

export const getServerSideProps: GetServerSideProps<IProps> = async ({ query }) => {
  const { postId } = query

  //const userResponse = await fetch(`https://inctagram.work/api/v1/public-user/profile/${userId}`)
  // const postsResponse = await fetch(`https://inctagram.work/api/v1/public-posts/user/${userId}`)
  const postResponse = await fetch(`https://inctagram.work/api/v1/public-posts/${postId}`)

  const post: IPostUser = await postResponse.json()
  // const posts: IPostPublicResponse = await postsResponse.json()
  //const user: GetPublicUserProfileByIdResponse = await userResponse.json()

  return { props: { post } }
}

function Profile({ post }: IProps) {
  const t = useRouterLocaleDefinition()
  const {
    isOwnProfile,
    isPostsLoading,
    isPostsLoadingInitial,
    isPostsLoadingWithScroll,
    isProfileLoading,
    isUserDataLoading,
    postsArray,
    postsImagesAssociativeArray,
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
      <MetaHead title={t.profilePage.title} />

      {isPostsLoadingWithScroll && <RequestLineLoader />}

      <InfoPanel
        about={profileData?.aboutMe || 'no info'}
        avatar={profileData?.avatars[0]?.url || ''}
        isWithSettingsBtn={isOwnProfile}
        userFollowers={userData?.followersCount || 0}
        userFollowing={userData?.followingCount || 0}
        userName={profileData?.userName || 'no info'}
        userPublications={userData?.publicationsCount || 0}
      />

      <PostsShower posts={postsArray} />

      <div ref={ref} style={{ height: '20px', width: '100%' }} />

      <ProfilePostModal post={post} postsImagesAssociativeArray={postsImagesAssociativeArray} />
    </>
  )
}

Profile.getLayout = getLayoutWithNav
export default Profile
