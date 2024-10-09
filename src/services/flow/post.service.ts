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
      deletePost: builder.mutation<void, void>({
        query: () => ({
          method: 'DELETE',
          url: `v1/posts/88888`, // here will be some logic to define current posts ID
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
  useUploadImagesForPostMutation,
} = postService
