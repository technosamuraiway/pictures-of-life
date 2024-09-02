import { inctagramApi } from '../api/inctagram.api'
import { ConfirmEmailArgs, ResendConfirmEmailArgs, SignUpArgs } from '../types/auth.types'

export const authService = inctagramApi.injectEndpoints({
  endpoints: builder => {
    return {
      confirmEmail: builder.mutation<any, ConfirmEmailArgs>({
        query: args => ({
          body: args,
          method: 'POST',
          url: `v1/auth/registration-confirmation`,
        }),
      }),
      resendConfirmEmail: builder.mutation<any, ResendConfirmEmailArgs>({
        query: args => ({
          body: args,
          method: 'POST',
          url: `v1/auth/registration-email-resending`,
        }),
      }),
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

export const { useConfirmEmailMutation, useResendConfirmEmailMutation, useSignUpMutation } =
  authService
