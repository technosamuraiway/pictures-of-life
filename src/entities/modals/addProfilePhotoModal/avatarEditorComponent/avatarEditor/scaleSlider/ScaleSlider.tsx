import { ChangeEvent } from 'react'

import { NegativeZoomIcon } from '@public/profileAvatar/NegativeZoomIcon'
import { PositiveZoomIcon } from '@public/profileAvatar/PositiveZoomIcon'
import { Typography } from '@technosamurai/techno-ui-kit'

import s from './ScaleSlider.module.scss'

interface IProps {
  onNegativeScaleClick: () => void
  onPositiveScaleClick: () => void
  onScaleChange: (e: ChangeEvent<HTMLInputElement>) => void
  scale: number
  scaleMax: number
  scaleMin: number
  scaleStep: number
}

export const ScaleSlider = ({
  onNegativeScaleClick,
  onPositiveScaleClick,
  onScaleChange,
  scale,
  scaleMax,
  scaleMin,
  scaleStep,
}: IProps) => {
  return (
    <div className={s.scaleWrapper}>
      <Typography variant={'h3'}>{scale}x</Typography>
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
    </div>
  )
}
