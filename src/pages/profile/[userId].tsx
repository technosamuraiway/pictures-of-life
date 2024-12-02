import { GetPublicUserProfileByIdResponse, IPostPublicResponse, IPostUser } from '@/services'
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
  post: IPostUser
  posts: IPostPublicResponse
  user: GetPublicUserProfileByIdResponse
}

export const getServerSideProps: GetServerSideProps<IProps> = async ({ query }) => {
  const { postId, userId } = query

  const userResponse = await fetch(`https://inctagram.work/api/v1/public-user/profile/${userId}`)
  const postsResponse = await fetch(`https://inctagram.work/api/v1/public-posts/user/${userId}`)
  const postResponse = await fetch(`https://inctagram.work/api/v1/public-posts/${postId}`)

  const post: IPostUser = await postResponse.json()
  const posts: IPostPublicResponse = await postsResponse.json()
  const user: GetPublicUserProfileByIdResponse = await userResponse.json()

  return { props: { post, posts, user } }
}

function Profile({ post, posts, user }: IProps) {
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
  } = useProfilePage(user, posts)

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
        userFollowers={userData?.followersCount || 0}
        userFollowing={userData?.followingCount || 0}
        userName={user?.userName || 'no info'}
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
