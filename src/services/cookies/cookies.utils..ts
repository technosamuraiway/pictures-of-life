import { destroyCookie, setCookie } from 'nookies'

// при наличии accessToken будем сетать куку для защиты routes в middleware
function setToken(AuthGuardToken: boolean) {
  setCookie(null, 'AuthGuardToken', String(AuthGuardToken), {
    maxAge: 30 * 24 * 60 * 60, // 30days
    path: '/',
    // secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  })
}

function removeToken() {
  destroyCookie(null, 'AuthGuardToken', {
    path: '/',
  })
}

export const cookiesAuthGuard = {
  removeToken,
  setToken,
}
