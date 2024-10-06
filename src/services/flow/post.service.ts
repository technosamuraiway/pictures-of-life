import { IPostTextArgs } from '@/services'

import { inctagramApi } from '../api/inctagram.api'
import {
  IPostImage,
  IPostImageArgs,
  IPostParams,
  IPostPublicResponse,
  IPostUser,
} from '../types/post.types'

export const postService = inctagramApi.injectEndpoints({
  endpoints: builder => {
    return {
      createDescriptionPost: builder.mutation<IPostUser, IPostTextArgs>({
        query: () => ({
          method: 'POST',
          url: `/v1/posts`,
        }),
      }),
      createImagePost: builder.mutation<IPostImage, IPostImageArgs>({
        invalidatesTags: ['PrivatePosts'],
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
      deletePost: builder.mutation<void, void>({
        query: () => ({
          method: 'DELETE',
          url: `v1/posts/88888`, // here will be some logic to define current posts ID
        }),
      }),
      getAllPublicPosts: builder.query<IPostPublicResponse, IPostParams | void>({
        query: arg => {
          const { endCursorPostId, ...params } = arg ?? {}

          return {
            params,
            url: `v1/public-posts/all/${endCursorPostId}`,
          }
        },
      }),
    }
  },
})

export const {
  useCreateDescriptionPostMutation,
  useCreateImagePostMutation,
  useDeletePostMutation,
  useGetAllPublicPostsQuery,
} = postService
