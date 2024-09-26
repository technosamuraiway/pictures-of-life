import { inctagramApi } from '../api/inctagram.api'
import { IPostPublicResponse } from '../types/post.types'

export const postService = inctagramApi.injectEndpoints({
  endpoints: builder => {
    return {
      getAllPublicPosts: builder.query<IPostPublicResponse, void>({
        query: () => {
          return { url: `v1/public-posts/all` }
        },
      }),
    }
  },
})

export const { useGetAllPublicPostsQuery } = postService
