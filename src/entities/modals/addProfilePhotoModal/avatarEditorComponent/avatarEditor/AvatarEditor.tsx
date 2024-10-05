import { Dispatch, ElementRef, forwardRef, useState } from 'react'
import Avatar from 'react-avatar-editor'

import { ScaleSlider } from '@/entities/components/scaleSlider/ScaleSlider'
import { DownloadFile, useRouterLocaleDefinition } from '@/shared'
import { Button } from '@technosamurai/techno-ui-kit'

import s from './AvatarEditor.module.scss'

interface IProps {
  image: string[]
  isDisableSaveBtn?: boolean
  maxImgSize: number
  onSaveBtnClick: () => void
  setErrorText: (error: null | string) => void
  setImage: Dispatch<React.SetStateAction<string[]>>
}

const SCALE_STEP = 0.1
const SCALE_MAX = 2
const SCALE_MIN = 0.1

export const AvatarEditor = forwardRef<ElementRef<typeof Avatar>, IProps>(
  ({ image, isDisableSaveBtn, maxImgSize, onSaveBtnClick, setErrorText, setImage }, ref) => {
    const t = useRouterLocaleDefinition()

    const [scale, setScale] = useState<number[]>([1])

    const scaleChangeHandler = (value: number[]) => {
      setScale(value)
    }

    return (
      <div className={s.wrapper}>
        <Avatar
          borderRadius={170}
          height={290}
          image={image[0] || ''}
          ref={ref}
          scale={scale[0]}
          width={290}
        />
        <ScaleSlider
          onScaleChange={scaleChangeHandler}
          scale={scale}
          scaleMax={SCALE_MAX}
          scaleMin={SCALE_MIN}
          scaleStep={SCALE_STEP}
          setScale={setScale}
        />
        <div className={s.buttonsWrapper}>
          <DownloadFile
            btnText={t.avatarChange.addNewAvatarBtn}
            btnVariant={'outline'}
            errorSizeText={t.avatarChange.errorSizeText}
            isDisabledBtn={isDisableSaveBtn}
            maxImgSize={maxImgSize}
            setError={setErrorText}
            setImage={setImage}
          />
          <Button disabled={isDisableSaveBtn} onClick={onSaveBtnClick} type={'button'}>
            {t.avatarChange.saveBtn}
          </Button>
        </div>
      </div>
    )
  }
)
