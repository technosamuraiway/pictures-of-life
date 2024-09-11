export interface ISignUpArgs {
  baseUrl?: string
  email: string
  password: string
  userName: string
}

export interface IConfirmEmailArgs {
  confirmationCode: string | string[]
}

export interface IResendConfirmEmailArgs {
  baseUrl?: string
  email: string | string[]
}

export interface ISignInArgs {
  email: string
  password: string
  userName?: string
}

export interface ISignInResponse {
  accessToken: string
  userId: string
}
