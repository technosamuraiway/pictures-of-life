// ============================== [ auth ] =======================================
export { Confirmation } from './auth/confirmation/Confirmation'
export { CreateNewPasswordForm } from './auth/createNewPasswordForm/CreateNewPasswordForm'
export { ForgotPasswordForm } from './auth/forgotPasswordForm/ForgotPasswordForm'
export { OAuth } from './auth/oAuth'
export { ServicePrivacy } from './auth/servicePrivacy/ServicePrivacy'
export { SignUpForm } from './auth/signUpForm/SignUpForm'

// ============================== [ modals ] ======================================
export { EmailSentModal } from './modals/emailSentModal/EmailSentModal'

// ============================== [ zod ] =======================================
export type { ICreateNewPassword, IForgotPassword, ISignUp } from './zodValidationScheme'

export type {
  CreateNewPasswordFormValues,
  ForgotPasswordFormValues,
  SignUpFormValues,
} from './zodValidationScheme'

export { createNewPasswordScheme, forgotPasswordScheme, signUpScheme } from './zodValidationScheme'
