import { inctagramApi } from '@/services/api/inctagram.api'

export const profileService = inctagramApi.injectEndpoints({
  endpoints: builder => {
    return {
      deleteAvatar: builder.mutation<void, void>({
        query: args => ({
          body: args,
          method: 'delete',
          url: `v1/users/profile/avatar`,
        }),
      }),
    }
  },
})

export const { useDeleteAvatarMutation } = profileService
