import { inctagramApi } from '../api/inctagram.api'
import {
  IConfirmEmailArgs,
  IResendConfirmEmailArgs,
  ISignInArgs,
  ISignInResponse,
  ISignUpArgs,
} from '../types/auth.types'

export const authService = inctagramApi.injectEndpoints({
  endpoints: builder => {
    return {
      confirmEmail: builder.mutation<void, IConfirmEmailArgs>({
        query: args => ({
          body: args,
          method: 'POST',
          url: `v1/auth/registration-confirmation`,
        }),
      }),
      resendConfirmEmail: builder.mutation<void, IResendConfirmEmailArgs>({
        query: args => ({
          body: args,
          method: 'POST',
          url: `v1/auth/registration-email-resending`,
        }),
      }),
      signIn: builder.mutation<ISignInResponse, ISignInArgs>({
        query: args => ({
          body: args,
          method: 'POST',
          url: `v1/auth/login`,
        }),
      }),
      signUp: builder.mutation<ISignInResponse, ISignInArgs>({
        query: args => ({
          body: args,
          method: 'POST',
          url: `v1/auth/registration`,
        }),
      }),
    }
  },
})

export const {
  useConfirmEmailMutation,
  useResendConfirmEmailMutation,
  useSignInMutation,
  useSignUpMutation,
} = authService
