import { inctagramApi } from '@/services'

const followersService = inctagramApi.injectEndpoints({
  endpoints: builder => ({
    unfollowByUserId: builder.mutation<void, { userId: number }>({
      query: args => {
        return {
          method: 'DELETE',
          url: `v1/users/follower/${args.userId}`,
        }
      },
    }),
  }),
})

export const { useUnfollowByUserIdMutation } = followersService
