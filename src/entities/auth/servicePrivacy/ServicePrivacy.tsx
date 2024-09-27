import { MetaHead, PATH } from '@/shared'
import arrowBack from '@public/arrowBack.svg'
import { Button, Typography } from '@technosamurai/techno-ui-kit'
import Image from 'next/image'
import Link from 'next/link'

import s from './ServicePrivacy.module.scss'

interface IProps {
  btnHref?: string
  buttonBackTitle: string
  mainText: string
  pageTitle: string
  textTitle: string
}

export const ServicePrivacy = ({
  btnHref = PATH.AUTH.SIGNUP,
  buttonBackTitle,
  mainText,
  pageTitle,
  textTitle,
}: IProps) => {
  return (
    <div className={s.wrapper}>
      <MetaHead title={pageTitle} />
      <Button as={Link} className={s.backToSign} href={btnHref} variant={'textButton'}>
        <Image alt={'Arrow Back'} src={arrowBack} />
        {buttonBackTitle}
      </Button>
      <Typography variant={'h1'}>{textTitle}</Typography>
      <Typography className={s.text} variant={'regular-text-14'}>
        {mainText}
      </Typography>
    </div>
  )
}
