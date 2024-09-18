import { ReactNode } from 'react'

import { AdaptiveTranslation } from '@/shared'
import emptyAvatar from '@public/profileAvatar/emptyAvatar.svg'
import { Button, Typography } from '@technosamurai/techno-ui-kit'
import Image from 'next/image'

import s from './AvatarEditor.module.scss'

interface IProps {
  errorText?: ReactNode
}

export const AvatarEditor = ({ errorText }: IProps) => {
  return (
    <div className={s.wrapper}>
      <div className={s.errorWrapper}>
        <Typography variant={'regular-text-14'}>{errorText}</Typography>
      </div>
      <div className={s.imgWrapper}>
        <Image
          alt={t.avatarChange.avatarImgAltText}
          className={s.avatarImg}
          src={image || emptyAvatar}
        />
      </div>
      <Button className={s.button} onClick={handleButtonClick} variant={'primary'}>
        {t.avatarChange.addAvatarModalButtonText}
      </Button>
      <input
        accept={'image/png, image/jpeg'}
        className={s.inputFile}
        onChange={handleFileChange}
        ref={fileInputRef}
        type={'file'}
      />
    </div>
  )
}
