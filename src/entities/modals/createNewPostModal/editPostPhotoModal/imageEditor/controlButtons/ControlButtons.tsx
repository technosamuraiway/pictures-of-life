import { Dispatch, SetStateAction, memo, useCallback, useState } from 'react'

import s from './ControlButtons.module.scss'

import { ImageState } from '../utils/types'
import { AddImages } from './addImages/AddImages'
import { ConfirmReset } from './confirmReset/ConfirmReset'
import { RatioChanger } from './ratioChanger/RatioChanger'
import { ZoomSlider } from './zoomSlider/ZoomSlider'

interface IProps {
  currentAspect: null | number
  currentImageIndex: number
  currentZoom: number
  downloadedImage: string[]
  initialImageState: ImageState
  onZoomChange: (zoom: number) => void
  setCurrentImageIndex: (currentImageIndex: number) => void
  setDownloadedImage: Dispatch<SetStateAction<string[]>>
  updateCurrentImageState: (newState: Partial<ImageState>) => void
}
export const ControlButtons = memo(
  ({
    currentAspect,
    currentImageIndex,
    currentZoom,
    downloadedImage,
    initialImageState,
    onZoomChange,
    setCurrentImageIndex,
    setDownloadedImage,
    updateCurrentImageState,
  }: IProps) => {
    const [openResetModal, setOpenResetModal] = useState<boolean>(false)

    const resetCurrentImageSettingHandler = useCallback(() => {
      updateCurrentImageState(initialImageState)
      setOpenResetModal(false)
    }, [initialImageState, setOpenResetModal, updateCurrentImageState])

    return (
      <div className={s.buttonsWrapper}>
        <div className={s.leftButtonsWrapper}>
          <RatioChanger
            currentAspect={currentAspect}
            updateCurrentImageState={updateCurrentImageState}
          />
          <ZoomSlider onZoomChange={onZoomChange} zoom={currentZoom} />
          <ConfirmReset
            openResetModal={openResetModal}
            resetImageSettings={resetCurrentImageSettingHandler}
            setOpenResetModal={setOpenResetModal}
          />
        </div>
        <AddImages
          currentImageIndex={currentImageIndex}
          images={downloadedImage}
          setCurrentImageIndex={setCurrentImageIndex}
          setDownloadedImage={setDownloadedImage}
        />
      </div>
    )
  }
)
