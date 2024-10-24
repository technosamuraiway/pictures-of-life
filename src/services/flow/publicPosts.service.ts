import { inctagramApi } from '@/services'

import {
  GetPublicUserPostByIdResponse,
  GetPublicUserProfileByIdResponse,
} from '../types/publicPosts.types'

export const publicPostsService = inctagramApi.injectEndpoints({
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
      getPublicUserProfileById: builder.query<GetPublicUserProfileByIdResponse, string>({
        query: profileId => {
          return {
            method: 'GET',
            url: `/v1/public-user/profile/${profileId}`,
          }
        },
      }),
    }
  },
})

export const { useGetPublicUserPostByIdQuery } = publicPostsService
