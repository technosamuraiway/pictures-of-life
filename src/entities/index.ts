// ============================== [ auth ] =======================================
export { Confirmation } from './auth/confirmation/Confirmation'
export { ForgotPasswordForm } from './auth/forgotPasswordForm/ForgotPasswordForm'
export { ServicePrivacy } from './auth/servicePrivacy/ServicePrivacy'
export { SignUpForm } from './auth/signUpForm/SignUpForm'

// ============================== [ zod ] =======================================
export type { ISignUp } from './zodValidationScheme'
export type { IForgotPassword } from './zodValidationScheme'

export type { SignUpFormValues } from './zodValidationScheme'
export type { ForgotPasswordFormValues } from './zodValidationScheme'

export { signUpScheme } from './zodValidationScheme'
export { forgotPasswordScheme } from './zodValidationScheme'

// ============================== [ modals ] ======================================
export { EmailSentModal } from '@/entities/modals/emailSentModal/EmailSentModal'
