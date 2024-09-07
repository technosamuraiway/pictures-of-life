// ============================== [ auth ] =======================================
export { Confirmation } from './auth/confirmation/Confirmation'
export { CreateNewPasswordForm } from './auth/createNewPasswordForm/CreateNewPasswordForm'
export { ForgotPasswordForm } from './auth/forgotPasswordForm/ForgotPasswordForm'
export { ServicePrivacy } from './auth/servicePrivacy/ServicePrivacy'
export { SignUpForm } from './auth/signUpForm/SignUpForm'

// ============================== [ zod ] =======================================
export type { ICreateNewPassword, IForgotPassword, ISignUp } from './zodValidationScheme'

export type {
  CreateNewPasswordFormValues,
  ForgotPasswordFormValues,
  SignUpFormValues,
} from './zodValidationScheme'

export { createNewPasswordScheme, forgotPasswordScheme, signUpScheme } from './zodValidationScheme'

// ============================== [ modals ] ======================================
export { EmailSentModal } from '@/entities/modals/emailSentModal/EmailSentModal'
