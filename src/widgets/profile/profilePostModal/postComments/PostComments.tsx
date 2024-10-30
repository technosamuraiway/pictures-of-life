import { memo } from 'react'

import s from './PostComments.module.scss'

interface iProps {}

export const PostComments = memo(({}: iProps) => {
  return <div className={s.root}></div>
})
