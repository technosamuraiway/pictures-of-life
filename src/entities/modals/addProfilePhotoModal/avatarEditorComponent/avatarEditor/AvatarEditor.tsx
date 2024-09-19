import { ChangeEvent, ElementRef, RefObject, forwardRef, useState } from 'react'
import Avatar from 'react-avatar-editor'

import { DownloadFile, useRouterLocaleDefinition } from '@/shared'
import { Button } from '@technosamurai/techno-ui-kit'

import s from './AvatarEditor.module.scss'

import { ScaleSlider } from './scaleSlider/ScaleSlider'

interface IProps {
  downloadFileRef: RefObject<HTMLInputElement>
  image: File | string
  onAddNewBtnClick: () => void
  onAddNewFile: (e: ChangeEvent<HTMLInputElement>) => void
  onSaveBtnClick: () => void
}

const SCALE_STEP = 0.1
const SCALE_MAX = 2
const SCALE_MIN = 0

export const AvatarEditor = forwardRef<ElementRef<typeof Avatar>, IProps>(
  (
    {
      downloadFileRef,
      image,
      onAddNewBtnClick,
      onAddNewFile,

      onSaveBtnClick,
    },
    ref
  ) => {
    const t = useRouterLocaleDefinition()

    const [scale, setScale] = useState<number>(1)

    const onPositiveScaleClickHandler = () => {
      scale < SCALE_MAX && setScale(Math.round((scale + SCALE_STEP) * 100) / 100)
    }

    const onNegativeScaleClickHandler = () => {
      scale > SCALE_MIN + SCALE_STEP && setScale(Math.round((scale - SCALE_STEP) * 100) / 100)
    }

    const scaleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setScale(parseFloat(e.target.value))
    }

    return (
      <div className={s.wrapper}>
        <Avatar borderRadius={170} height={290} image={image} ref={ref} scale={scale} width={290} />
        <ScaleSlider
          onNegativeScaleClick={onNegativeScaleClickHandler}
          onPositiveScaleClick={onPositiveScaleClickHandler}
          onScaleChange={scaleChangeHandler}
          scale={scale}
          scaleMax={SCALE_MAX}
          scaleMin={SCALE_MIN}
          scaleStep={SCALE_STEP}
        />
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
