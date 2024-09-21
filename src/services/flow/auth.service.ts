import { toast } from 'react-toastify'

import { saveStateToLocalStorage } from '@/shared'

import { inctagramApi } from '../api/inctagram.api'
import {
  ICheckRecoveryCodeArgs,
  IConfirmEmailArgs,
  ICreateNewPasswordArgs,
  IForgotPasswordArgs,
  IGoogleSignResponse,
  IGoogleSignUpArgs,
  IMeResponse,
  IResendConfirmEmailArgs,
  ISignInArgs,
  ISignInResponse,
  ISignUpArgs,
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
      googleSignUp: builder.mutation<IGoogleSignResponse, IGoogleSignUpArgs>({
        query: args => ({
          body: args,
          method: 'POST',
          url: `v1/auth/google/login`,
        }),
      }),
      logOut: builder.mutation<void, void>({
        onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
          await queryFulfilled
          localStorage.removeItem('accessToken')
        },
        query: args => ({
          body: args,
          credentials: 'include',
          method: 'POST',
          url: `v1/auth/logout`,
        }),
      }),
      meCurInfo: builder.query<IMeResponse, void>({
        query: () => ({
          method: 'GET',
          url: `v1/auth/me`,
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
        async onQueryStarted(_, { queryFulfilled }) {
          const { data } = await queryFulfilled

          if (!data) {
            return
          }
          localStorage.setItem('accessToken', data.accessToken.trim())
        },
        query: args => ({
          body: args,
          method: 'POST',
          url: '/v1/auth/login',
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
  useGoogleSignUpMutation,
  useLogOutMutation,
  useMeCurInfoQuery,
  useResendConfirmEmailMutation,
  useSignInMutation,
  useSignUpMutation,
  useUpdateTokensMutation,
} = authService
