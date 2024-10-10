import React, { PropsWithChildren } from 'react'

import { NextPage } from 'next'

export const AuthGuard: NextPage<PropsWithChildren> = ({ children }) => {
  return <div>{children}</div>
}
