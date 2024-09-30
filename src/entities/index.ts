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

// ============================== [ profile ] ======================================
export { ProfileForm } from './profile/profileForm/ProfileForm'

// ============================== [ zod ] =======================================
export type {
  ICreateNewPassword,
  IForgotPassword,
  IProfile,
  ISignIn,
  ISignUp,
} from './zodValidationScheme'

export type {
  CreateNewPasswordFormValues,
  ForgotPasswordFormValues,
  ProfileFormValues,
  SignInFormValues,
  SignUpFormValues,
} from './zodValidationScheme'

export {
  createNewPasswordScheme,
  forgotPasswordScheme,
  profileValidationScheme,
  signInScheme,
  signUpScheme,
} from './zodValidationScheme'
