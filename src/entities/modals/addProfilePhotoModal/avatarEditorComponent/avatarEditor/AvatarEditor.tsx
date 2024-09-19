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
  onNegativeScaleClick: () => void
  onPositiveScaleClick: () => void
  onSaveBtnClick: () => void
  onScaleChange: (scale: ChangeEvent<HTMLInputElement>) => void
  scale: number
  scaleMax?: number
  scaleMin?: number
  scaleStep?: number
}

export const AvatarEditor = forwardRef<ElementRef<typeof Avatar>, IProps>(
  (
    {
      downloadFileRef,
      image,
      onAddNewBtnClick,
      onAddNewFile,
      onNegativeScaleClick,
      onPositiveScaleClick,
      onSaveBtnClick,
      onScaleChange,
      scale,
      scaleMax,
      scaleMin,
      scaleStep,
    },
    ref
  ) => {
    const t = useRouterLocaleDefinition()

    return (
      <div className={s.wrapper}>
        <Avatar borderRadius={170} height={290} image={image} ref={ref} scale={scale} width={290} />
        <div className={s.sliderWrapper}>
          <NegativeZoomIcon className={s.icon} onClick={onNegativeScaleClick} />
          <input
            defaultValue={'1'}
            max={scaleMax}
            min={scaleMin}
            onChange={onScaleChange}
            step={scaleStep}
            type={'range'}
          />
          <PositiveZoomIcon className={s.icon} onClick={onPositiveScaleClick} />
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
