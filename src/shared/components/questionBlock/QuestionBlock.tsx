import { ComponentPropsWithoutRef } from 'react'

import { ButtonLink } from '@/shared'
import { Typography } from '@technosamurai/techno-ui-kit'
import clsx from 'clsx'

import s from './QuestionBlock.module.scss'

interface IProps extends ComponentPropsWithoutRef<'div'> {
  buttonTitle: string
  linkHref: string
  question: string
}

export const QuestionBlock = (props: IProps) => {
  const { buttonTitle, className, linkHref, question, ...rest } = props

  return (
    <div className={clsx(s.wrapper, className)} {...rest}>
      <Typography className={s.text} variant={'regular-text-16'}>
        {question}
      </Typography>
      <ButtonLink linkHref={linkHref} title={buttonTitle} />
    </div>
  )
}
