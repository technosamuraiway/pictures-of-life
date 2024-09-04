// ============================== [ auth ] =======================================
export { Confirmation } from './auth/confirmation/Confirmation'
export { ServicePrivacy } from './auth/servicePrivacy/ServicePrivacy'
export { SignUpForm } from './auth/signUpForm/SignUpForm'

// ============================== [ zod ] =======================================
export type { ISignUp } from './useZodValidation'
export type { SignUpFormValues } from './useZodValidation'
export { signUpScheme } from './useZodValidation'

// ============================== [ modals ] =======================================
export { EmailSentModal } from '@/entities/modals/emailSentModal/EmailSentModal'
