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
  IPostParams,
  IPostPublicResponse,
  IPostUser,
  IPostsByNameArgs,
  IPostsByNameResponse,
  IUploadPostImagesArgs,
  IUploadPostImagesResponse,
  UpdatePostLikeStatusArgs,
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

      getUserPublicPosts: builder.query<IPostPublicResponse, IGetUserPublicPostsArgs>({
        merge: (currentCache, newItems, { arg }) => {
          if (arg.endCursorPostId === undefined) {
            // Если endCursorPostId не определен, это новый запрос, поэтому заменяем кеш
            return newItems
          }

          if (currentCache) {
            return {
              ...currentCache,
              items: [...currentCache.items, ...newItems.items],
              totalCount: newItems.totalCount,
            }
          }
        },
        query: ({ userId, ...params }) => {
          const url = params.endCursorPostId
            ? `v1/public-posts/user/${userId}/${params.endCursorPostId}`
            : `v1/public-posts/user/${userId}`

          return {
            method: 'GET',
            params: {
              pageSize: params.pageSize || 8,
              sortBy: params.sortBy || 'createdAt',
              sortDirection: params.sortDirection || 'desc',
            },
            url,
          }
        },
        serializeQueryArgs: ({ endpointName, queryArgs }) => {
          return `${endpointName}-${queryArgs.userId}`
        },
      }),

      updatePostLikeStatus: builder.mutation<void, UpdatePostLikeStatusArgs>({
        invalidatesTags: ['Posts'],
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
  useGetPostsByUserNameQuery,
  useGetUserPublicPostsQuery,
  useLazyGetUserPublicPostsQuery,
  useUpdatePostLikeStatusMutation,
  useUploadImagesForPostMutation,
} = postService
