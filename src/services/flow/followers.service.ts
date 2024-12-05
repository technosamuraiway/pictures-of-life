import {
  ICreateFollowingArgs,
  IGetUserFollowersArgs,
  IGetUserFollowersResponse,
  IUnFollowByUserIdArgs,
} from '@/services'

import { inctagramApi } from '../api/inctagram.api'

const followersService = inctagramApi.injectEndpoints({
  endpoints: builder => ({
    createFollowing: builder.mutation<void, ICreateFollowingArgs>({
      invalidatesTags: ['Followers'],

      query: ({ selectedUserId }) => ({
        body: { selectedUserId },
        method: 'POST',
        url: `v1/users/following`,
      }),
    }),

    getUserFollowers: builder.query<IGetUserFollowersResponse, IGetUserFollowersArgs>({
      providesTags: ['Followers'],

      query: args => {
        const { userName, ...params } = args

        return {
          method: 'GET',
          params: params,
          url: `v1/users/${userName}/followers`,
        }
      },
    }),

    getUserFollowing: builder.query<IGetUserFollowersResponse, IGetUserFollowersArgs>({
      providesTags: ['Followers'],

      query: args => {
        const { userName, ...params } = args

        return {
          method: 'GET',
          params: params,
          url: `v1/users/${userName}/following`,
        }
      },
    }),

    unfollowByUserId: builder.mutation<void, IUnFollowByUserIdArgs>({
      invalidatesTags: ['Followers'],

      query: ({ userId }) => {
        return {
          method: 'DELETE',
          url: `v1/users/follower/${userId}`,
        }
      },
    }),
  }),
})

export const {
  useCreateFollowingMutation,
  useGetUserFollowersQuery,
  useGetUserFollowingQuery,
  useUnfollowByUserIdMutation,
} = followersService
