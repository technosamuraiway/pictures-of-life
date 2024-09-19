import { ChangeEvent, ElementRef, forwardRef } from 'react'

import { Button } from '@technosamurai/techno-ui-kit'

import s from './DownloadFile.module.scss'

interface IProps {
  btnText: string
  onBtnClick: () => void
  onChangeFile: (e: ChangeEvent<HTMLInputElement>) => void
}

export const DownloadFile = forwardRef<ElementRef<'input'>, IProps>(
  ({ btnText, onBtnClick, onChangeFile }, ref) => {
    return (
      <>
        <Button className={s.button} onClick={onBtnClick} variant={'primary'}>
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
