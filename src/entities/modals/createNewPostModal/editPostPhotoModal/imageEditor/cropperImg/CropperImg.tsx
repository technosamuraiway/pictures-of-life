import Cropper, { Area, Point } from 'react-easy-crop'

import s from './CropperImg.module.scss'

import { ImageState } from '../utils/types'

interface IProps {
  currentAspect: null | number
  currentCrop: Point
  currentFilter: string
  currentImg: string
  currentZoom: number
  onZoomChange: (zoom: number) => void
  updateCurrentImageState: (newState: Partial<ImageState>) => void
}

export const CropperImg = ({
  currentAspect,
  currentCrop,
  currentFilter,
  currentImg,
  currentZoom,
  onZoomChange,
  updateCurrentImageState,
}: IProps) => {
  const onCropChangeHandler = (crop: Point) => {
    updateCurrentImageState({ crop })
  }

  const onCropCompleteHandler = (_: unknown, croppedAreaPixels: Area) => {
    updateCurrentImageState({ croppedAreaPixels })
  }

  return (
    <div className={s.cropperWrapper}>
      <Cropper
        aspect={currentAspect !== null ? currentAspect : undefined}
        crop={currentCrop}
        image={currentImg}
        onCropChange={onCropChangeHandler}
        onCropComplete={onCropCompleteHandler}
        onZoomChange={onZoomChange}
        style={{
          mediaStyle: {
            filter: currentFilter,
          },
        }}
        zoom={currentZoom}
      />
    </div>
  )
}
