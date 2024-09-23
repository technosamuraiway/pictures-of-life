import { NegativeZoomIcon } from '@public/profileAvatar/NegativeZoomIcon'
import { PositiveZoomIcon } from '@public/profileAvatar/PositiveZoomIcon'
import { Slider, Typography } from '@technosamurai/techno-ui-kit'

import s from './ScaleSlider.module.scss'

interface IProps {
  onNegativeScaleClick: () => void
  onPositiveScaleClick: () => void
  onScaleChange: (value: number[]) => void
  scale: number[]
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
      <Typography variant={'h3'}>{scale[0]}x</Typography>
      <div className={s.sliderWrapper}>
        <NegativeZoomIcon className={s.icon} onClick={onNegativeScaleClick} />
        <Slider
          max={scaleMax}
          min={scaleMin}
          onValueChange={onScaleChange}
          step={scaleStep}
          value={scale}
        />
        <PositiveZoomIcon className={s.icon} onClick={onPositiveScaleClick} />
      </div>
    </div>
  )
}
