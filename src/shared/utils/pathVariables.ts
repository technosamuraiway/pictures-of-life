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
  CREATEPOST: '/createpost',
  HOME: '/',
  PROFILE: {
    BASEPROFILE: '/profile',
    SETTINGS: '/profile/settings',
  },
} as const

// для проверки страниц - authGuard
// URLGITHUBLOGIN и URLGOOGLELOGIN не используются
const PUBLIC_ROUTES = [
  PATH.AUTH.CREATENEWPASSWORD,
  PATH.AUTH.FORGOTPASSWORD,
  PATH.AUTH.PRIVACYPOLICY,
  PATH.AUTH.SIGNIN,
  PATH.AUTH.SIGNUP,
  PATH.AUTH.TERMSOFSRVICE,
  '/public-page',
]

export const PUBLIC_ROUTES_SET = new Set(PUBLIC_ROUTES)
