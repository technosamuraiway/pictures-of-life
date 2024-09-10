import { inctagramApi } from '../api/inctagram.api'
import {
  IConfirmEmailArgs,
  IGoogleSignResponse,
  IGoogleSignUpArgs,
  IResendConfirmEmailArgs,
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
      googleSignUp: builder.mutation<IGoogleSignResponse, IGoogleSignUpArgs>({
        query: args => ({
          body: args,
          method: 'POST',
          url: `v1/auth/google/login`,
        }),
      }),
      resendConfirmEmail: builder.mutation<void, IResendConfirmEmailArgs>({
        query: args => ({
          body: args,
          method: 'POST',
          url: `v1/auth/registration-email-resending`,
        }),
      }),
      signUp: builder.mutation<void, ISignUpArgs>({
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
  useGoogleSignUpMutation,
  useResendConfirmEmailMutation,
  useSignUpMutation,
} = authService
