import { NegativeZoomIcon } from '@public/profileAvatar/NegativeZoomIcon'
import { PositiveZoomIcon } from '@public/profileAvatar/PositiveZoomIcon'
import { Slider, Typography } from '@technosamurai/techno-ui-kit'

import s from './ScaleSlider.module.scss'

interface IProps {
  onScaleChange: (value: number[]) => void
  scale: number[]
  scaleMax: number
  scaleMin: number
  scaleStep: number
  setScale: (value: number[]) => void
}

export const ScaleSlider = ({
  onScaleChange,
  scale,
  scaleMax,
  scaleMin,
  scaleStep,
  setScale,
}: IProps) => {
  const onPositiveScaleClickHandler = () => {
    scale[0] < scaleMax && setScale([Math.round((scale[0] + scaleStep) * 100) / 100])
  }

  const onNegativeScaleClickHandler = () => {
    scale[0] > scaleMin && setScale([Math.round((scale[0] - scaleStep) * 100) / 100])
  }

  return (
    <div className={s.scaleWrapper}>
      <Typography variant={'h3'}>{scale[0]}x</Typography>
      <div className={s.sliderWrapper}>
        <NegativeZoomIcon className={s.icon} onClick={onNegativeScaleClickHandler} />
        <Slider
          max={scaleMax}
          min={scaleMin}
          onValueChange={onScaleChange}
          step={scaleStep}
          value={scale}
        />
        <PositiveZoomIcon className={s.icon} onClick={onPositiveScaleClickHandler} />
      </div>
    </div>
  )
}
