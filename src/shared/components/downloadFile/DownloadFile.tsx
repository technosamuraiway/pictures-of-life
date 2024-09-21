import { ChangeEvent, ElementRef, forwardRef } from 'react'

import { Button, ButtonVariant } from '@technosamurai/techno-ui-kit'

import s from './DownloadFile.module.scss'

interface IProps {
  btnText: string
  btnVariant?: ButtonVariant
  isDisabledBtn?: boolean
  onBtnClick: () => void
  onChangeFile: (e: ChangeEvent<HTMLInputElement>) => void
}

export const DownloadFile = forwardRef<ElementRef<'input'>, IProps>(
  ({ btnText, btnVariant = 'primary', isDisabledBtn, onBtnClick, onChangeFile, ...rest }, ref) => {
    return (
      <>
        <Button
          className={s.button}
          disabled={isDisabledBtn}
          onClick={onBtnClick}
          variant={btnVariant}
        >
          {btnText}
        </Button>
        <input
          {...rest}
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
