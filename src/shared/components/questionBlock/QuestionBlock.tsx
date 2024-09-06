import { ComponentPropsWithoutRef } from 'react'

import { Button, Typography } from '@technosamurai/techno-ui-kit'
import clsx from 'clsx'
import Link from 'next/link'

import s from './QuestionBlock.module.scss'

interface IProps extends ComponentPropsWithoutRef<'div'> {
  buttonTitle: string
  linkHref: string
  question: string
}

export const QuestionBlock = ({ buttonTitle, className, linkHref, question, ...rest }: IProps) => {
  return (
    <div className={clsx(s.wrapper, className)} {...rest}>
      <Typography className={s.text} variant={'regular-text-16'}>
        {question}
      </Typography>
      <Button as={Link} className={s.button} href={linkHref} variant={'textButton'}>
        {buttonTitle}
      </Button>
    </div>
  )
}
