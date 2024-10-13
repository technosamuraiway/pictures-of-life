// import { NextRequest, NextResponse } from 'next/server'
//
// export async function middleware(req: NextRequest, res: NextResponse) {
//   const { cookies } = req
//
//   const accessToken = cookies.get('accessToken')?.value
//
//   console.log('MIDDLEWARE =>', accessToken)
//
//   return NextResponse.next()
// }
//
// export const config = {
//   matcher: '/:path*',
// }

import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest, res: NextResponse) {
  const accessToken = req.cookies.get('accessToken')?.value

  return NextResponse.next()
}

export const config = {
  matcher: '/:path*',
}
