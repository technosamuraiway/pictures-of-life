import { PATH } from '@/shared'
import Router from 'next/router'

export function openProfilePostModalFnc(postId: string) {
  const { push, query } = Router

  return () => {
    push({ pathname: `${PATH.PROFILE.BASEPROFILE}/${query.userId}`, query: { postId } })
  }
}
