import { useState } from 'react'

import { ScaleSlider } from '@/entities/components/scaleSlider/ScaleSlider'
import { ActiveZoomIcon } from '@public/createPost/ActiveZoomIcon'
import { DefaultZoomIcon } from '@public/createPost/DefaultZoomIcon'
import { Dropdown } from '@technosamurai/techno-ui-kit'
import clsx from 'clsx'

import s from './ZoomSlider.module.scss'

interface IProps {
  currentImageScale: number
  onZoomChange: (currentImageScale: number[]) => void
}

export const ZoomSlider = ({ currentImageScale, onZoomChange }: IProps) => {
  const [openSliderDropDown, setOpenSliderDropDown] = useState<boolean>(false)

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
        onScaleChange={onZoomChange}
        scale={[currentImageScale]}
        scaleMax={2}
        scaleMin={0.1}
        scaleStep={0.1}
        scaleWrapperCN={s.scaleWrapper}
        setScale={onZoomChange}
        sliderRootCN={s.sliderRoot}
        sliderWrapperCN={s.sliderWrapper}
        zoomIconCN={s.sliderZoomIcon}
      />
    </Dropdown.Root>
  )
}
