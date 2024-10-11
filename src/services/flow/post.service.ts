import { inctagramApi } from '../api/inctagram.api'
import {
  ICreatePostArgs,
  IPostParams,
  IPostPublicResponse,
  IPostUser,
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
      getUserPublicPosts: builder.query<
        IPostPublicResponse,
        { params?: IPostParams; userId: number }
      >({
        query: ({ params, userId }) => {
          const { endCursorPostId, ...restParams } = params ?? {}
          const url = endCursorPostId
            ? `v1/public-posts/user/${userId}/${endCursorPostId}`
            : `v1/public-posts/user/${userId}`

          return {
            method: 'GET',
            params: restParams,
            url,
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
  useCreatePostMutation,
  useDeletePostMutation,
  useGetAllPublicPostsQuery,
  useGetUserPublicPostsQuery,
  useUploadImagesForPostMutation,
} = postService
