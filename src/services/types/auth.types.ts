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
  recaptcha: string
}
