import { inctagramApi } from '../api/inctagram.api'
import { IPostParams, IPostPublicResponse, IPostUser } from '../types/post.types'

export const postService = inctagramApi.injectEndpoints({
  endpoints: builder => {
    return {
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
            params: restParams, // Передаем остальные параметры в запрос
            url,
          }
        },
      }),
    }
  },
})

export const { useDeletePostMutation, useGetAllPublicPostsQuery } = postService
