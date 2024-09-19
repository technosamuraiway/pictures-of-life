import { ChangeEvent, ElementRef, RefObject, forwardRef } from 'react'
import Avatar from 'react-avatar-editor'

import { DownloadFile, useRouterLocaleDefinition } from '@/shared'
import { NegativeZoomIcon } from '@public/profileAvatar/NegativeZoomIcon'
import { PositiveZoomIcon } from '@public/profileAvatar/PositiveZoomIcon'
import { Button } from '@technosamurai/techno-ui-kit'

import s from './AvatarEditor.module.scss'

interface IProps {
  downloadFileRef: RefObject<HTMLInputElement>
  image: File | string
  onAddNewBtnClick: () => void
  onAddNewFile: (e: ChangeEvent<HTMLInputElement>) => void
  onSaveBtnClick: () => void
  onScaleChange: (scale: ChangeEvent<HTMLInputElement>) => void
  scale: number
}

export const AvatarEditor = forwardRef<ElementRef<typeof Avatar>, IProps>(
  (
    {
      downloadFileRef,
      image,
      onAddNewBtnClick,
      onAddNewFile,
      onSaveBtnClick,
      onScaleChange,
      scale,
    },
    ref
  ) => {
    const t = useRouterLocaleDefinition()

    return (
      <div className={s.wrapper}>
        <Avatar borderRadius={170} height={290} image={image} ref={ref} scale={scale} width={290} />
        <div className={s.sliderWrapper}>
          <NegativeZoomIcon />
          <input
            defaultValue={'1'}
            max={'2'}
            min={'1'}
            onChange={onScaleChange}
            step={'0.01'}
            type={'range'}
          />
          <PositiveZoomIcon />
        </div>
        <div className={s.buttonsWrapper}>
          <DownloadFile
            btnText={t.avatarChange.addNewAvatarBtn}
            btnVariant={'outline'}
            onBtnClick={onAddNewBtnClick}
            onChangeFile={onAddNewFile}
            ref={downloadFileRef}
          />
          <Button onClick={onSaveBtnClick}>{t.avatarChange.saveBtn}</Button>
        </div>
      </div>
    )
  }
)
