import { inctagramApi } from '../api/inctagram.api'
import { IPostParams, IPostPublicResponse } from '../types/post.types'

export const postService = inctagramApi.injectEndpoints({
  endpoints: builder => {
    return {
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

export const { useGetAllPublicPostsQuery } = postService
