export interface SignUpArgs {
  baseUrl?: string
  email: string
  password: string
  userName: string
}

export interface ConfirmEmailArgs {
  confirmationCode: string | string[]
}

export interface ResendConfirmEmailArgs {
  baseUrl?: string
  email: string | string[]
}
