import { inctagramApi } from '../api/inctagram.api'
import { SignUpArgs } from '../types/auth.types'

export const authService = inctagramApi.injectEndpoints({
  endpoints: builder => {
    return {
      signUp: builder.mutation<any, SignUpArgs>({
        query: args => ({
          body: args,
          method: 'POST',
          url: `v1/auth/registration`,
        }),
      }),
    }
  },
})

export const { useSignUpMutation } = authService
