import { inctagramApi } from '../api/inctagram.api'
import {
  ChangePostDescriptionArgs,
  GetAnswersArgs,
  GetAnswersLikesArgs,
  GetAnswersLikesResponse,
  GetAnswersResponse,
  ICommentResponse,
  ICreatePostArgs,
  IGetUserPublicPostsArgs,
  IPostLikesArgs,
  IPostLikesResponse,
  IPostParams,
  IPostPublicResponse,
  IPostUser,
  IPostsByNameArgs,
  IPostsByNameResponse,
  IUploadPostImagesArgs,
  IUploadPostImagesResponse,
  UpdatePostLikeStatusArgs,
  UserProfileResponse,
} from '../types/post.types'

export const postService = inctagramApi.injectEndpoints({
  endpoints: builder => {
    return {
      changePostDescription: builder.mutation<void, ChangePostDescriptionArgs>({
        invalidatesTags: ['Posts'],
        query: args => {
          const { description, postId } = args

          return {
            body: { description },
            method: 'PUT',
            url: `/v1/posts/${postId}`,
          }
        },
      }),

      createPost: builder.mutation<IPostUser, ICreatePostArgs>({
        invalidatesTags: ['Posts'],

        query: ({ description, uploadIds }) => ({
          body: {
            childrenMetadata: uploadIds.map(uploadId => {
              return { uploadId }
            }),
            description,
          },
          method: 'POST',
          url: `/v1/posts`,
        }),
      }),
      deletePost: builder.mutation<void, number>({
        invalidatesTags: ['Posts'],
        query: postID => ({
          method: 'DELETE',
          url: `v1/posts/${postID}`,
        }),
      }),
      getAllPublicPosts: builder.query<IPostPublicResponse, IPostParams | void>({
        providesTags: ['Posts'],
        query: arg => {
          const { endCursorPostId, ...params } = arg ?? {}

          return {
            params,
            url: `v1/public-posts/all/${endCursorPostId}`,
          }
        },
      }),
      getAnswers: builder.query<GetAnswersResponse, GetAnswersArgs>({
        providesTags: ['Answers'],
        query: args => {
          const { commentId, postId, ...rest } = args

          return {
            method: 'GET',
            params: { rest },
            url: `v1/posts/${postId}/comments/${commentId}/answers`,
          }
        },
      }),
      getAnswersLikes: builder.query<GetAnswersLikesResponse, GetAnswersLikesArgs>({
        providesTags: ['Answers'],
        query: args => {
          const { answerId, commentId, postId, ...rest } = args

          return {
            method: 'GET',
            params: { rest },
            url: `v1/posts/${postId}/comments/${commentId}/answers/${answerId}}/likes`,
          }
        },
      }),
      getPostById: builder.query<IPostUser, string>({
        providesTags: ['Posts'],
        query: postId => {
          return {
            method: 'GET',
            url: `/v1/posts/id/${postId}`,
          }
        },
      }),
      getPostComments: builder.query<
        ICommentResponse,
        { params?: Record<string, any>; postId: number }
      >({
        providesTags: ['Comments'],
        query: ({ params, postId }) => ({
          method: 'GET',
          params,
          url: `/v1/public-posts/${postId}/comments`,
        }),
      }),
      getPostCommentsById: builder.query<{ notReadCount: number } & ICommentResponse, number>({
        providesTags: ['Comments'],
        query: postId => ({ url: `/v1/posts/${postId}/comments` }),
      }),
      getPostLikesByPostId: builder.query<IPostLikesResponse, IPostLikesArgs>({
        providesTags: ['Followers', 'Posts'],

        query: args => {
          const { postId, ...params } = args

          return {
            method: 'GET',
            params: params,
            url: `/v1/posts/${postId}/likes`,
          }
        },
      }),

      getPostsByUserName: builder.query<IPostsByNameResponse, IPostsByNameArgs>({
        query: args => {
          const { pageNumber, pageSize, sortBy, sortDirection, userName } = args

          return {
            method: 'GET',
            params: { pageNumber, pageSize, sortBy, sortDirection },
            url: `/v1/posts/${userName}`,
          }
        },
      }),

      getUserProfile: builder.query<UserProfileResponse, number>({
        query: userId => ({
          method: 'GET',
          url: `/v1/public-user/profile/${userId}`,
        }),
      }),

      getUserPublicPosts: builder.query<IPostPublicResponse, IGetUserPublicPostsArgs>({
        forceRefetch({ currentArg, previousArg }) {
          return currentArg?.endCursorPostId !== previousArg?.endCursorPostId
        },

        merge: (currentCache, newItems) => {
          if (!currentCache) {
            return newItems
          }

          /* при удалении нужно профильтровать закешированные посты */
          const deletedPostId = Number(sessionStorage.getItem('deletedPostId'))
          const filteredCacheItems = currentCache.items.filter(item => item.id !== deletedPostId)

          sessionStorage.removeItem('deletedPostId')

          const posts = [...filteredCacheItems, ...newItems.items].sort((a, b) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          })

          return {
            ...currentCache,
            items: posts,
            totalCount: newItems.totalCount,
          }
        },
        query: ({
          endCursorPostId,
          pageSize = 8,
          sortBy = 'createdAt',
          sortDirection = 'desc',
          userId,
        }) => {
          const url = endCursorPostId
            ? `v1/public-posts/user/${userId}/${endCursorPostId}`
            : `v1/public-posts/user/${userId}`

          return {
            method: 'GET',
            params: {
              pageSize,
              sortBy,
              sortDirection,
            },
            url,
          }
        },

        serializeQueryArgs: ({ endpointName, queryArgs }) => {
          return `${endpointName}-${queryArgs.userId}`
        },
      }),
      updatePostLikeStatus: builder.mutation<void, UpdatePostLikeStatusArgs>({
        invalidatesTags: ['Posts', 'Followers'],
        query: args => {
          const { likeStatus, postId } = args

          return {
            body: { likeStatus },
            method: 'PUT',
            url: `/v1/posts/${postId}/like-status`,
          }
        },
      }),

      uploadImagesForPost: builder.mutation<IUploadPostImagesResponse, IUploadPostImagesArgs>({
        query: ({ files }) => {
          const formData = new FormData()

          Array.from(files).forEach(file => {
            formData.append('file', file)
          })

          return {
            body: formData,
            method: 'POST',
            url: `v1/posts/image`,
          }
        },
      }),
    }
  },
})

export const {
  useChangePostDescriptionMutation,
  useCreatePostMutation,
  useDeletePostMutation,
  useGetAllPublicPostsQuery,
  useGetAnswersLikesQuery,
  useGetAnswersQuery,
  // useGetUserProfileByUserNameQuery,
  useGetPostByIdQuery,
  useGetPostCommentsByIdQuery,
  useGetPostCommentsQuery,
  useGetPostLikesByPostIdQuery,
  useGetPostsByUserNameQuery,
  useGetUserProfileQuery,
  useGetUserPublicPostsQuery,
  useLazyGetUserPublicPostsQuery,
  useUpdatePostLikeStatusMutation,
  useUploadImagesForPostMutation,
} = postService
