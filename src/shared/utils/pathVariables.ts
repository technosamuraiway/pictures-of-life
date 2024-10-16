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
  PUBLIC: '/public',
  PUBLICPOST: '/public/post',
  PUBLICUSER: '/public-user/[userId]',
} as const

export const PUBLIC_ROUTES_SET = new Set<string>([
  PATH.AUTH.CREATENEWPASSWORD,
  PATH.AUTH.FORGOTPASSWORD,
  PATH.AUTH.PRIVACYPOLICY,
  PATH.AUTH.SIGNIN,
  PATH.AUTH.SIGNUP,
  PATH.AUTH.TERMSOFSRVICE,
  PATH.AUTH.URLGITHUBLOGIN,
  PATH.AUTH.URLGOOGLELOGIN,
  PATH.PUBLIC,
  PATH.PUBLICPOST + '/[id]',
  PATH.PUBLICUSER,
])

export const PUBLIC_ROUTES_SET_WITH_BTN = new Set<string>([
  PATH.PUBLIC,
  PATH.PUBLICPOST + '/[id]',
  PATH.PUBLICUSER,
])
