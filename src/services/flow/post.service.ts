import { inctagramApi } from '../api/inctagram.api'
import {
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
} from '../types/post.types'

export const postService = inctagramApi.injectEndpoints({
  endpoints: builder => {
    return {
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
      getPostComments: builder.query<
        ICommentResponse,
        { params?: Record<string, any>; postId: number }
      >({
        query: ({ params, postId }) => ({
          method: 'GET',
          params,
          url: `/v1/public-posts/${postId}/comments`,
        }),
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
  useCreatePostMutation,
  useDeletePostMutation,
  useGetAllPublicPostsQuery,
  useGetPostCommentsQuery,
  useGetPostsByUserNameQuery,
  useGetUserPublicPostsQuery,
  useLazyGetUserPublicPostsQuery,
  useUploadImagesForPostMutation,
  // useGetUserProfileByUserNameQuery,
} = postService
