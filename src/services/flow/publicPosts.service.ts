import { ICommentResponse, inctagramApi } from '@/services'

import {
  GetPublicPostCommentsByIdRequest,
  GetPublicUserPostByIdResponse,
} from '../types/publicPosts.types'

const publicPostsService = inctagramApi.injectEndpoints({
  endpoints: builder => {
    return {
      getPublicPostById: builder.query<GetPublicUserPostByIdResponse, string>({
        query: postId => {
          return {
            method: 'GET',
            url: `/v1/public-posts/${postId}`,
          }
        },
      }),
      getPublicPostCommentsById: builder.query<ICommentResponse, GetPublicPostCommentsByIdRequest>({
        query: params => {
          const { postId, sortDirection, ...rest } = params

          return {
            method: 'GET',
            params: { sortDirection: sortDirection ?? 'desc', ...rest },
            url: `/v1/public-posts/${postId}/comments`,
          }
        },
      }),
    }
  },
})

export const { useGetPublicPostByIdQuery, useGetPublicPostCommentsByIdQuery } = publicPostsService
