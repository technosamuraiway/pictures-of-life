import { LocaleType } from './ru'

export const en: LocaleType = {
  avatarChange: {
    addAvatarButton: 'Add a Profile Photo',
    addAvatarModalButtonText: 'Select from Computer',
    addAvatarModalHeader: 'Add a Profile Photo',
    addNewAvatarBtn: 'Add New Photo',
    avatarImgAltText: 'Your avatar here',
    avatarSaved: 'Avatar saved successfully!',
    deleteAvatarModalButtonNo: 'No',
    deleteAvatarModalButtonYes: 'Yes',
    deleteAvatarModalHeader: 'Delete Avatar',
    deleteAvatarModalText: 'Are you sure you want to delete the avatar?',
    deleteAvatarSuccess: 'Avatar was deleted successfully!',
    errorFormatText: 'Error! The format of the uploaded photo must be PNG or JPEG',
    errorMaxCount: 'Error! You cannot upload more than 10 files!',
    errorSizeText: 'Error! Photo size must be less than 10 MB!',
    saveBtn: 'Save',
  },
  createNewPost: {
    addPhotoModal: {
      addImgModalButtonText: 'Select from Computer',
      errorSizeText: 'Error! Photo size must be less than 20 MB!',
      modalTitle: 'Add Photo',
      openDraftButtonText: 'Open Draft',
    },
    editPhotoModal: {
      locationInputLabel: 'Add locations',
      modalExitDiscardBtn: 'Discard',
      modalExitSaveDraftBtn: 'Save Draft',
      modalExitText:
        'Do you really want to close the creation of a publication? If you close everything will be deleted',
      modalExitTitle: 'Close',
      modalFiltersTitle: 'Filters',
      modalPublicationTitle: 'Publication',
      modalTitle: 'Photo Editor',
      nextBtn: 'Next',
      originalRatio: 'Original',
      publishBtn: 'Publish',
      resetSettings: {
        headerTitle: 'Reset Your Changes',
        mainText: 'Are you sure you want to reset the settings? All changes will be lost.',
        negativeResult: 'No',
        positiveResult: 'Yes',
      },
      textAreaCharLimit: 'Your rich char limit!',
      textAreaLabel: 'Add publication descriptions',
      textAreaPlaceHolder: 'Your description start here...',
    },

    title: 'Создать пост',
  },
  error404Page: {
    btnText: 'Back to Home',
    mainText: "Sorry! Page isn't found!",
    title: '404: Page not found',
  },
  expiredEmailLink: {
    buttonEmailVerificationText: 'Resend verification link',
    buttonPasswordVerificationText: 'Resend password recovery link',
    emailVerificationPageHeader: 'Email verification link expired',
    imgAltText: 'Please, try again',
    mainText:
      'Looks like the verification link has expired. Not to worry, we can send the link again',
    passwordVerificationPageHeader: 'Password recovery link expired',
    title: 'Confirmation Link Expired',
  },
  forgotPasswordPage: {
    additionalText:
      'The link has been sent by email. If you don’t receive an email send link again',
    backToSignInButtonText: 'Back to Sign In',
    email: 'Email',
    mainText: 'Enter your email address and we will send you further instructions',
    recaptcha: 'I’m not a robot',
    submitButtonText: 'Send Link',
    title: 'Forgot Password',
  },
  logOut: {
    buttonNo: 'No',
    buttonYes: 'Yes',
    logOutButton: 'Log Out',
    logOutModalHeader: 'Log Out',
    logOutSuccess: 'Logout successful. See you next time!',
    logOutText: 'Are you really want to log out of your account <1>email</1> ?',
  },
  navBar: {
    create: 'Create',
    favorites: 'Favorites',
    home: 'Home',
    messenger: 'Messenger',
    myProfile: 'My Profile',
    search: 'Search',
    statistics: 'Statistics',
  },
  newPasswordPage: {
    buttonText: 'Create new password',
    mainText: 'Your password must be between 6 and 20 characters ',
    newPassword: 'New password',
    passwordConfirmation: 'Password confirmation',
    successMessage: 'Your password has been successfully changed!',
    title: 'Create New Password',
  },
  pagination: {
    onPage: 'on page',
    show: 'Show',
  },
  passwordRecoveryPage: {
    title: 'Password recovery page',
  },
  posts: {
    qustionAboutDelete: 'Are you sure you want to delete this post?',
    regUsers: 'Registered users:',
    successfulDeletePost: 'You have successfully deleted this post',
  },
  privacyPolicy: {
    backToProfile: 'Back to Profile Settings',
    backToSign: 'Back to Sign Up',
    text: `We value your privacy and are committed to protecting your personal information. In this Privacy Policy, we will explain what information we collect, how we use it, and how we protect your privacy.
      1. Collection and Use of Information
         We collect certain information when you visit our website or use our services. This information may include your name, email address, contact information, and other data that you voluntarily provide to us.
         We use the collected information to provide you with our services, communicate with you, improve our website, and analyze data.
      2. Disclosure of Information to Third Parties
         We do not sell, trade, or transfer your personal information to third parties without your consent, except as required by law.
      3. Data Security
         We take measures to protect your personal data from unauthorized access, use, or disclosure. However, no method of data transmission over the internet or electronic storage is completely secure. We cannot guarantee the absolute security of your data.
      4. Your Rights
         You have the right to request access, correction, or deletion of your personal data that we store. You can also withdraw your consent to the processing of your data or restrict its use. To do so, please contact us using the provided contact information.`,
    title: 'Privacy Policy',
  },
  profilePage: {
    settingButton: 'Profile Settings',
    title: 'Profile',
  },
  settingsPage: {
    devices: {
      activeSessions: 'Active sessions',
      deleteSessionMessage: 'Device successfully deleted',
      deleteSessionsMessage: 'All third-party devices have been successfully removed',
      lastVisit: 'Last visit',
      logOutButton: 'Log Out',
      noOtherSessionsText: 'You have not yet logged in from other devices',
      tabHeader: 'Current device',
      terminateButton: 'Terminate all other sessions',
      tittle: 'Devices',
    },
    general: 'General information',
    infoForm: {
      city: 'Select your city',
      country: 'Select your country',
      dateBirth: 'Date of Birth',
      emptyCities: 'There is no cities',
      emptyStates: 'There is no states',
      errorMessage: 'A user under 13 cannot create a profile.',
      firstName: 'First Name',
      lastName: 'Last Name',
      placeCity: 'City',
      placeCountry: 'Country',
      placeState: 'State',
      privacyPol: 'Privacy Policy',
      saveBtn: 'Save changes',
      state: 'Select your state',
      textArea: 'About me',
      textAreaPlace: 'Tell us something about yourself...',
      userName: 'Username',
    },
    management: 'Account Management',
    payments: 'My payments',
    title: 'Settings',
    updateProfileSuccess: 'Your data has been successfully updated!',
  },
  signInPage: {
    accountQuestion: 'Don’t have an account?',
    email: 'Email',
    forgotPassword: 'Forgot Password',
    gitHubLinkAlt: 'GitHub icon',
    gitHubLinkTitle: 'Sing Up with GitHub',
    googleLinkAlt: 'Google icon',
    googleLinkTitle: 'Sing Up with Google',
    password: 'Password',
    signInButton: 'Sign In',
    successLogIn: 'You are successfully signed in. Welcome!',
    title: 'Sign In',
  },
  signUpPage: {
    email: 'Email',
    gitHubLinkAlt: 'GitHub icon',
    gitHubLinkTitle: 'Sing Up with GitHub',
    googleLinkAlt: 'Google icon',
    googleLinkTitle: 'Sing Up with Google',
    haveAccountQuestion: 'Do you have an account?',
    modalText: 'We have sent a link to confirm your email to: <1>email</1>',
    modalTitle: 'Email Sent',
    password: 'Password',
    passwordConfirmation: 'Password Confirmation',
    policyLink: 'Privacy Policy',
    serviceAndPolicyAgreement: 'I agree to the <1>service</1> and <2>policy</2>',
    serviceLink: 'Terms of Service',
    title: 'Sign Up',
    username: 'Username',
  },
  successConfirmEmail: {
    buttonText: 'Sign In',
    imgAltText: 'Beautiful Life',
    mainText: 'Your email has been confirmed',
    pageHeader: 'Congratulations!',
    title: 'Email Confirmation',
  },
  termsOfService: {
    backToSign: 'Back to Sign Up',
    text: `Welcome to our website. By continuing to use this website, you agree to comply with our terms of service. Please read them carefully.
            1. User Agreement
               By using our website, you agree to comply with all applicable laws and regulations.
               It is prohibited to use our website for illegal or malicious purposes.
               We are not responsible for any damage caused to you or third parties as a result of using our website.
            2. Intellectual Property
              All content on our website, including text, images, logos, and graphics, is our property or used with permission from the copyright holders.
              Copying, distributing, or using our content without our permission is prohibited.
            3. Limitation of Liability
              We are not responsible for any errors or inaccuracies on our website.
              We reserve the right to make changes to our terms of service at any time without prior notice.`,
    title: 'Terms of Service',
  },
  timeAgo: {
    ago: 'ago',
    day: 'day',
    daysFew: 'days',
    daysMany: 'days',
    hour: 'hour',
    hoursFew: 'hours',
    hoursMany: 'hours',
    minute: 'min',
    minutesFew: 'min',
    minutesMany: 'min',
    month: 'month',
    monthsFew: 'months',
    monthsMany: 'months',
    week: 'week',
    weeksFew: 'weeks',
    weeksMany: 'weeks',
    year: 'year',
    yearsFew: 'years',
    yearsMany: 'years',
  },
  title: 'Main page',
  validationSchemes: {
    aboutMe: 'Field about me must contain',
    confirmPassword: 'Passwords must match',
    emailRequired: 'Email is required',
    emailScheme: 'The email must match the format example@example.com',
    firstName: 'Firstname must contain',
    lastName: 'Lastname must contain',
    maximumNumber: 'Maximum number of characters',
    minimumNumber: 'Minimum number of characters',
    password: 'Password must contain',
    username: 'Username must contain',
  },
}
