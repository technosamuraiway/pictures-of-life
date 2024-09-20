import { inctagramApi } from '@/services/api/inctagram.api'
import { IProfileResponse } from '@/services/types/profile.types'

export const profileService = inctagramApi.injectEndpoints({
  endpoints: builder => {
    return {
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

export const { useDeleteAvatarMutation, useGetProfileQuery } = profileService
