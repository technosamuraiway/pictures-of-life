import { useState } from 'react'

import { ScaleSlider } from '@/entities/components/scaleSlider/ScaleSlider'
import { ActiveZoomIcon } from '@public/createPost/ActiveZoomIcon'
import { DefaultZoomIcon } from '@public/createPost/DefaultZoomIcon'
import { Dropdown } from '@technosamurai/techno-ui-kit'
import clsx from 'clsx'

import s from './ZoomSlider.module.scss'

interface IProps {
  onZoomChange: (zoom: number) => void
  zoom: number
}

export const ZoomSlider = ({ onZoomChange, zoom }: IProps) => {
  const [openSliderDropDown, setOpenSliderDropDown] = useState<boolean>(false)

  const onZoomChangeHandler = (zoom: number[]) => {
    onZoomChange(zoom[0])
  }

  return (
    <Dropdown.Root
      contentAlign={'start'}
      contentCN={s.dropdownContent}
      contentSide={'top'}
      onOpenChange={setOpenSliderDropDown}
      open={openSliderDropDown}
      trigger={
        openSliderDropDown ? (
          <ActiveZoomIcon className={clsx(s.triggerIcon, s.activeTriggerIcon)} />
        ) : (
          <DefaultZoomIcon className={clsx(s.triggerIcon, s.defaultTriggerIcon)} />
        )
      }
      triggerCN={s.triggerBtn}
      withArrow={false}
    >
      <ScaleSlider
        onScaleChange={onZoomChangeHandler}
        scale={[zoom]}
        scaleMax={2}
        scaleMin={0.1}
        scaleStep={0.1}
        scaleWrapperCN={s.scaleWrapper}
        setScale={onZoomChangeHandler}
        sliderRootCN={s.sliderRoot}
        sliderWrapperCN={s.sliderWrapper}
        zoomIconCN={s.sliderZoomIcon}
      />
    </Dropdown.Root>
  )
}
