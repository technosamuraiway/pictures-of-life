import { inctagramApi } from '@/services/api/inctagram.api'
import { AvatarsType, IAvatarArgs, IProfileResponse } from '@/services/types/profile.types'

export const profileService = inctagramApi.injectEndpoints({
  endpoints: builder => {
    return {
      changeAvatar: builder.mutation<AvatarsType[], IAvatarArgs>({
        query: args => ({
          body: args,
          method: 'POST',
          url: `v1/users/profile/avatar`,
        }),
      }),
      deleteAvatar: builder.mutation<void, void>({
        query: () => ({
          method: 'DELETE',
          url: `v1/users/profile/avatar`,
        }),
      }),
      getProfile: builder.query<IProfileResponse, void>({
        query: () => ({
          method: 'GET',
          url: `v1/users/profile`,
        }),
      }),
    }
  },
})

export const { useChangeAvatarMutation, useDeleteAvatarMutation, useGetProfileQuery } =
  profileService
