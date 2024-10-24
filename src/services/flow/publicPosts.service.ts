import { inctagramApi } from '@/services'

import { GetPublicUserPostByIdResponse } from '../types/publicPosts.types'

const publicPostsService = inctagramApi.injectEndpoints({
  endpoints: builder => {
    return {
      getPublicUserPostById: builder.query<GetPublicUserPostByIdResponse, string>({
        query: postId => {
          return {
            method: 'GET',
            url: `/v1/public-posts/${postId}`,
          }
        },
      }),
    }
  },
})

export const { useGetPublicUserPostByIdQuery } = publicPostsService
