import { NegativeZoomIcon } from '@public/profileAvatar/NegativeZoomIcon'
import { PositiveZoomIcon } from '@public/profileAvatar/PositiveZoomIcon'
import { Slider, Typography } from '@technosamurai/techno-ui-kit'
import clsx from 'clsx'

import s from './ScaleSlider.module.scss'

interface IProps {
  onScaleChange: (value: number[]) => void
  scale: number[]
  scaleMax: number
  scaleMin: number
  scaleStep: number
  scaleWrapperCN?: string
  setScale: (value: number[]) => void
  sliderRootCN?: string
  sliderWrapperCN?: string
  zoomIconCN?: string
}

export const ScaleSlider = ({
  onScaleChange,
  scale,
  scaleMax,
  scaleMin,
  scaleStep,
  scaleWrapperCN,
  setScale,
  sliderRootCN,
  sliderWrapperCN,
  zoomIconCN,
}: IProps) => {
  const onPositiveScaleClickHandler = () => {
    scale[0] < scaleMax && setScale([Math.round((scale[0] + scaleStep) * 100) / 100])
  }

  const onNegativeScaleClickHandler = () => {
    scale[0] > scaleMin && setScale([Math.round((scale[0] - scaleStep) * 100) / 100])
  }

  return (
    <div className={clsx(s.scaleWrapper, scaleWrapperCN)}>
      <Typography variant={'h3'}>{scale[0]}x</Typography>
      <div className={clsx(s.sliderWrapper, sliderWrapperCN)}>
        <NegativeZoomIcon
          className={clsx(s.icon, zoomIconCN)}
          onClick={onNegativeScaleClickHandler}
        />
        <Slider
          className={sliderRootCN}
          max={scaleMax}
          min={scaleMin}
          onValueChange={onScaleChange}
          step={scaleStep}
          value={scale}
        />
        <PositiveZoomIcon
          className={clsx(s.icon, zoomIconCN)}
          onClick={onPositiveScaleClickHandler}
        />
      </div>
    </div>
  )
}
