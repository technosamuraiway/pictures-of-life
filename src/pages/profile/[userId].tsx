import { GetPublicUserProfileByIdResponse, IPostPublicResponse } from '@/services'
import { InitLoader, MetaHead, RequestLineLoader } from '@/shared'
import {
  InfoPanel,
  PostsShower,
  ProfilePostModal,
  getLayoutWithNav,
  useProfilePage,
} from '@/widgets'
import { GetServerSideProps } from 'next'

interface IProps {
  // post: IPostUser
  posts: IPostPublicResponse
  user: GetPublicUserProfileByIdResponse
}

export const getServerSideProps: GetServerSideProps<IProps> = async ({ query }) => {
  const { postId, userId } = query

  const userResponse = await fetch(`https://inctagram.work/api/v1/public-user/profile/${userId}`)
  const postsResponse = await fetch(`https://inctagram.work/api/v1/public-posts/user/${userId}`)

  // const [userResponse, postsResponse, postResponse] = await Promise.all<Response>([
  //   fetch(`https://inctagram.work/api/v1/public-user/profile/${userId}`),
  //   fetch(`https://inctagram.work/api/v1/public-posts/user/${userId}`),
  //   fetch(`https://inctagram.work/api/v1/public-posts/${postId}`),
  // ])

  // const post: IPostUser = await postResponse.json()
  const posts: IPostPublicResponse = await postsResponse.json()
  const user: GetPublicUserProfileByIdResponse = await userResponse.json()

  return { props: { posts, user } }
}

function Profile({ user }: IProps) {
  const {
    isOwnProfile,
    isPostsLoading,
    isPostsLoadingInitial,
    isPostsLoadingWithScroll,
    isUserDataLoading,
    postsArray,
    postsImagesAssociativeArray,
    ref,
    userData,
  } = useProfilePage(user)

  // !при scroll-posts-fetching => isPostsLoading все ровно false
  if (isUserDataLoading || isPostsLoading || isPostsLoadingInitial) {
    return <InitLoader />
  }

  return (
    <>
      <MetaHead title={'Profile info'} />

      {isPostsLoadingWithScroll && <RequestLineLoader />}

      <InfoPanel
        about={user?.aboutMe || 'no info'}
        avatar={user?.avatars[0]?.url || ''}
        isWithSettingsBtn={isOwnProfile}
        userFollowers={userData?.followersCount || 999}
        userFollowing={userData?.followingCount || 999}
        userName={user?.userName || 'no info'}
        userPublications={userData?.publicationsCount || 999}
      />

      <PostsShower posts={postsArray} />

      <div ref={ref} style={{ height: '20px', width: '100%' }} />

      <ProfilePostModal postsImagesAssociativeArray={postsImagesAssociativeArray} />
    </>
  )
}

Profile.getLayout = getLayoutWithNav
export default Profile
