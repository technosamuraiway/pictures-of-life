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

export interface IForgotPasswordArgs extends IResendConfirmEmailArgs {
  recaptcha?: string
}

export interface ICreateNewPasswordArgs extends ICheckRecoveryCodeArgs {
  newPassword: string
}

export interface ICheckRecoveryCodeArgs {
  recoveryCode: string | string[]
}

export interface IGoogleSignUpArgs {
  baseUrl?: string
  code: string | string[] | undefined
}

export interface IGoogleSignResponse {
  accessToken: string
  email: string
}
