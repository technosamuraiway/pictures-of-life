import { ComponentPropsWithoutRef } from 'react'

import { Button } from '@technosamurai/techno-ui-kit'
import clsx from 'clsx'
import Link from 'next/link'

import s from './ButtonLink.module.scss'

interface IProps extends ComponentPropsWithoutRef<typeof Button> {
  className?: string
  linkHref: string
  title: string
}

export const ButtonLink = ({ className, linkHref, title, ...rest }: IProps) => {
  return (
    <Button
      as={Link}
      className={clsx(s.button, className)}
      href={linkHref}
      variant={'textButton'}
      {...rest}
    >
      {title}
    </Button>
  )
}
