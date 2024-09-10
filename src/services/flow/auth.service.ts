import { inctagramApi } from '../api/inctagram.api'
import {
  IConfirmEmailArgs,
  IGoogleSignResponse,
  IGoogleSignUpArgs,
  IResendConfirmEmailArgs,
  ISignUpArgs,ICreateNewPasswordArgs,
  IForgotPasswordArgs,
  ICheckRecoveryCodeArgs,
} from '../types/auth.types'


export const authService = inctagramApi.injectEndpoints({
  endpoints: builder => {
    return {
      checkRecoveryCode: builder.mutation<void, ICheckRecoveryCodeArgs>({
        query: args => ({
          body: args,
          method: 'POST',
          url: `v1/auth/check-recovery-code`,
        }),
      }),
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
      createNewPassword: builder.mutation<void, ICreateNewPasswordArgs>({
        query: args => ({
          body: args,
          method: 'POST',
          url: `v1/auth/new-password`,
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
      updateTokens: builder.mutation<void, void>({
        query: args => ({
          body: args,
          method: 'POST',
          url: `v1/auth/update-tokens`,
        }),
      }),
    }
  },
})

export const {
  useCheckRecoveryCodeMutation,
  useConfirmEmailMutation,
  useCreateNewPasswordMutation,
  useForgotPasswordMutation,
  useResendConfirmEmailMutation,
  useSignUpMutation,
  useUpdateTokensMutation,useGoogleSignUpMutation,,
} = authService
