// ============================== [ auth ] =======================================
export { Confirmation } from './auth/confirmation/Confirmation'
export { OAuth } from './auth/oAuth'
export { ServicePrivacy } from './auth/servicePrivacy/ServicePrivacy'
export { SignUpForm } from './auth/signUpForm/SignUpForm'

// ============================== [ zod ] =======================================
export type { ISignUp } from './zodValidationScheme'
export type { SignUpFormValues } from './zodValidationScheme'
export { signUpScheme } from './zodValidationScheme'

// ============================== [ modals ] ======================================
export { EmailSentModal } from '@/entities/modals/emailSentModal/EmailSentModal'
