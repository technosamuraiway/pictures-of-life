export const PATH = {
  ADMIN: {
    ADMIN: '/admin',
    USERLIST: '/admin/user-list',
    USERSLIST: '/admin/users-list',
  },
  AUTH: {
    CREATENEWPASSWORD: '/auth/recovery',
    FORGOTPASSWORD: '/auth/forgotpassword',
    PRIVACYPOLICY: '/auth/privacypolicy',
    SIGNIN: '/auth/signin',
    SIGNINADMIN: '/auth/signIn-admin',
    SIGNUP: '/auth/signup',
    TERMSOFSRVICE: '/auth/termsofservice',
    URLGOOGLELOGIN: 'https://inctagram.work/api/v1/auth/google/login',
  },
  CREATEPOST: '/createpost',
  GITHUB: '/github',
  HOME: '/',
  PROFILE: {
    BASEPROFILE: '/profile',
    BASEPROFILEWITHQUERY: '/profile/[userId]',
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
  PATH.AUTH.URLGOOGLELOGIN,
  PATH.PUBLIC,
  PATH.PUBLICPOST + '/[id]',
  PATH.PUBLICUSER,
  PATH.GITHUB,
])

export const PUBLIC_ROUTES_SET_WITH_BTN = new Set<string>([
  PATH.PUBLIC,
  PATH.PUBLICPOST + '/[id]',
  PATH.PUBLICUSER,
  PATH.PROFILE.BASEPROFILEWITHQUERY,
])
