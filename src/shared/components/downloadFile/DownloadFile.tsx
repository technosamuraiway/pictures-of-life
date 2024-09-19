import { ChangeEvent, ElementRef, forwardRef } from 'react'

import { Button, ButtonVariant } from '@technosamurai/techno-ui-kit'

import s from './DownloadFile.module.scss'

interface IProps {
  btnText: string
  btnVariant?: ButtonVariant
  onBtnClick: () => void
  onChangeFile: (e: ChangeEvent<HTMLInputElement>) => void
}

export const DownloadFile = forwardRef<ElementRef<'input'>, IProps>(
  ({ btnText, btnVariant = 'primary', onBtnClick, onChangeFile }, ref) => {
    return (
      <>
        <Button className={s.button} onClick={onBtnClick} variant={btnVariant}>
          {btnText}
        </Button>
        <input
          accept={'image/png, image/jpeg'}
          className={s.inputFile}
          onChange={onChangeFile}
          ref={ref}
          type={'file'}
        />
      </>
    )
  }
)
