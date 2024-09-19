import { ChangeEvent, ElementRef, ReactNode, forwardRef } from 'react'

import { useRouterLocaleDefinition } from '@/shared'
import emptyAvatar from '@public/profileAvatar/emptyAvatar.svg'
import { Button, Typography } from '@technosamurai/techno-ui-kit'
import Image from 'next/image'

import s from './BeforeEditor.module.scss'

interface IProps {
  errorText?: ReactNode
  imageAvatar: File | string
  onChangeFileImg: (e: ChangeEvent<HTMLInputElement>) => void
  onClickAddAvatar: () => void
}

export const BeforeEditor = forwardRef<ElementRef<'input'>, IProps>(
  ({ errorText, imageAvatar, onChangeFileImg, onClickAddAvatar }, ref) => {
    const t = useRouterLocaleDefinition()

    return (
      <div className={s.wrapper}>
        {errorText && (
          <div className={s.errorWrapper}>
            <Typography variant={'regular-text-14'}>{errorText}</Typography>
          </div>
        )}
        <div className={s.imgWrapper}>
          <Image
            alt={t.avatarChange.avatarImgAltText}
            className={s.avatarImg}
            src={imageAvatar || emptyAvatar}
          />
        </div>
        <Button className={s.button} onClick={onClickAddAvatar} variant={'primary'}>
          {t.avatarChange.addAvatarModalButtonText}
        </Button>
        <input
          accept={'image/png, image/jpeg'}
          className={s.inputFile}
          onChange={onChangeFileImg}
          ref={ref}
          type={'file'}
        />
      </div>
    )
  }
)
