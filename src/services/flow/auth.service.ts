import { inctagramApi } from '../api/inctagram.api'
import {
  IConfirmEmailArgs,
  IForgotPasswordArgs,
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
      forgotPassword: builder.mutation<void, IForgotPasswordArgs>({
        query: args => ({
          body: args,
          method: 'POST',
          url: `v1/auth/password-recovery`,
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
  useForgotPasswordMutation,
  useResendConfirmEmailMutation,
  useSignUpMutation,
} = authService
