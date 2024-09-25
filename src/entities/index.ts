// ============================== [ auth ] =======================================
export { Confirmation } from './auth/confirmation/Confirmation'
export { CreateNewPasswordForm } from './auth/createNewPasswordForm/CreateNewPasswordForm'
export { ForgotPasswordForm } from './auth/forgotPasswordForm/ForgotPasswordForm'
export { OAuth } from './auth/oAuth'
export { ServicePrivacy } from './auth/servicePrivacy/ServicePrivacy'
export { SignInForm } from './auth/signInForm/SignInForm'
export { SignUpForm } from './auth/signUpForm/SignUpForm'

// ============================== [ modals ] ======================================
export { ActionConfirmationModal } from './modals/actionConfirmationModal/ActionConfirmationModal'
export { AddProfilePhotoModal } from './modals/addProfilePhotoModal/AddProfilePhotoModal'
export { CreateNewPostModal } from './modals/createNewPostModal/CreateNewPostModal'
export { EmailSentModal } from './modals/emailSentModal/EmailSentModal'

// ============================== [ zod ] =======================================
export type { ICreateNewPassword, IForgotPassword, ISignIn, ISignUp } from './zodValidationScheme'

export type {
  CreateNewPasswordFormValues,
  ForgotPasswordFormValues,
  SignInFormValues,
  SignUpFormValues,
} from './zodValidationScheme'

export {
  createNewPasswordScheme,
  forgotPasswordScheme,
  signInScheme,
  signUpScheme,
} from './zodValidationScheme'
