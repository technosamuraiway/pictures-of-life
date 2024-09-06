import { Button } from '@technosamurai/techno-ui-kit'
import clsx from 'clsx'
import Link from 'next/link'

import s from './ButtonLink.module.scss'

interface IProps {
  className?: string
  linkHref: string
  title: string
}

export const ButtonLink = (props: IProps) => {
  const { className, linkHref, title } = props

  return (
    <Button as={Link} className={clsx(s.button, className)} href={linkHref} variant={'textButton'}>
      {title}
    </Button>
  )
}
