import { MetaHead } from '@/shared'
import { Button, Typography } from '@technosamurai/techno-ui-kit'
import Image, { StaticImageData } from 'next/image'

import s from './Confirmation.module.scss'

interface IProps {
  buttonText: string
  imgAltText: string
  imgHeight?: number
  imgPngSrc: StaticImageData
  imgWidth?: number
  isButtonDisable?: boolean
  mainText: string
  onButtonClick: () => void
  pageHeader: string
  pageTitle: string
}

export const Confirmation = ({
  buttonText,
  imgAltText,
  imgHeight = 300,
  imgPngSrc,
  imgWidth = 430,
  isButtonDisable,
  mainText,
  onButtonClick,
  pageHeader,
  pageTitle,
}: IProps) => {
  return (
    <div className={s.wrapper}>
      <MetaHead title={pageTitle} />
      <Typography variant={'h1'}>{pageHeader}</Typography>
      <Typography className={s.mainText}>{mainText}</Typography>
      <Button className={s.button} disabled={isButtonDisable} onClick={onButtonClick}>
        {buttonText}
      </Button>
      <Image alt={imgAltText} height={imgHeight} src={imgPngSrc} width={imgWidth} />
    </div>
  )
}
