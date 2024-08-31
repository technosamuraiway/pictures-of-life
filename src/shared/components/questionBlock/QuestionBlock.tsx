import { ComponentPropsWithoutRef } from 'react'

import { Button, Typography } from '@technosamurai/techno-ui-kit'
import clsx from 'clsx'
import Link from 'next/link'

import s from './QuestionBlock.module.scss'

interface IProps extends ComponentPropsWithoutRef<'div'> {
  buttonTitle: string
  question: string
}

export const QuestionBlock = (props: IProps) => {
  const { buttonTitle, className, question, ...rest } = props

  return (
    <div className={clsx(s.wrapper, className)} {...rest}>
      <Typography variant={'regular-text-16'}>{question}</Typography>
      <Button as={Link} className={s.button} href={'/'} variant={'textButton'}>
        {buttonTitle}
      </Button>
    </div>
  )
}
