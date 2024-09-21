export const PATH = {
  AUTH: {
    CREATENEWPASSWORD: '/auth/recovery',
    FORGOTPASSWORD: '/auth/forgotpassword',
    PRIVACYPOLICY: '/auth/privacypolicy',
    SIGNIN: '/auth/signin',
    SIGNUP: '/auth/signup',
    TERMSOFSRVICE: '/auth/termsofservice',
    URLGITHUBLOGIN: 'https://inctagram.work/api/v1/auth/github/login',
    URLGOOGLELOGIN: 'https://inctagram.work/api/v1/auth/google/login',
  },
  HOME: '/',
  PROFILE: {
    BASEPROFILE: '/profile',
    SETTINGS: '/profile/settings',
  },
} as const
