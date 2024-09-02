import { MetaHead } from '@/shared/components/metaHead/MetaHead'
import { Button, Typography } from '@technosamurai/techno-ui-kit'
import Image from 'next/image'

import s from './Confirmation.module.scss'

interface IProps {
  buttonText: string
  imgAltText: string
  imgHeight: number
  imgPngSrc: string
  imgWebpSrc: string
  imgWidth: number
  mainText: string
  pageHeader: string
  pageTitle: string
}

export const Confirmation = (props: IProps) => {
  const {
    buttonText,
    imgAltText,
    imgHeight = 300,
    imgPngSrc,
    imgWebpSrc,
    imgWidth = 430,
    mainText,
    pageHeader,
    pageTitle,
  } = props

  return (
    <>
      <MetaHead title={pageTitle} />
      <Typography variant={'h1'}>{pageHeader}</Typography>
      <Typography>{mainText}</Typography>
      <Button>{buttonText}</Button>
      <picture className={s.imgConfirm}>
        <source srcSet={imgWebpSrc} type={'image/webp'} />
        <Image alt={imgAltText} height={imgHeight} src={imgPngSrc} width={imgWidth} />
      </picture>
    </>
  )
}
