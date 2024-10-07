import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'

import { useRouterLocaleDefinition } from '@/shared'

import s from './ImageEditor.module.scss'

import { ControlButtons } from './controlButtons/ControlButtons'
import { CropperImg } from './cropperImg/CropperImg'
import { FiltersChanger } from './filtersChanger/FiltersChanger'
import { Navigation } from './navigation/Navigation'
import { ImageState } from './utils/types'

interface IProps {
  downloadedImage: string[]
  editFilter: boolean
  imageStates: ImageState[]
  setDownloadedImage: Dispatch<SetStateAction<string[]>>
  setImageStates: Dispatch<SetStateAction<ImageState[]>>
}

const initialImageState: ImageState = {
  aspect: 4 / 3,
  crop: { x: 0, y: 0 },
  croppedAreaPixels: null,
  filter: 'none',
  zoom: 1,
}

const MAX_IMAGES = 10

export const ImageEditor = ({
  downloadedImage,
  editFilter,
  imageStates,
  setDownloadedImage,
  setImageStates,
}: IProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)

  const t = useRouterLocaleDefinition()

  useEffect(() => {
    if (downloadedImage.length > 0 && downloadedImage.length <= MAX_IMAGES) {
      setImageStates(downloadedImage.map(() => ({ ...initialImageState })))
    } else if (downloadedImage.length > MAX_IMAGES) {
      toast.error(t.createNewPost.addPhotoModal.errorMaxCount)
      setDownloadedImage(prevImages => prevImages.slice(0, MAX_IMAGES))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [downloadedImage, setDownloadedImage, t.createNewPost.addPhotoModal.errorMaxCount])

  const currentState = useMemo(
    () =>
      imageStates[currentImageIndex] || {
        aspect: 4 / 3,
        crop: { x: 0, y: 0 },
        croppedAreaPixels: null,
        filter: 'none',
        zoom: 1,
      },
    [currentImageIndex, imageStates]
  )

  const updateCurrentImageStateHandler = (newState: Partial<ImageState>) => {
    setImageStates(prev => {
      const newStates = [...prev]

      if (newStates[currentImageIndex]) {
        newStates[currentImageIndex] = { ...newStates[currentImageIndex], ...newState }
      }

      return newStates
    })
  }

  const onZoomChangeHandler = (zoom: number) => {
    updateCurrentImageStateHandler({ zoom })
  }

  return (
    <div className={s.baseWrapper}>
      <div className={s.editorWrapper}>
        <CropperImg
          currentAspect={currentState.aspect}
          currentCrop={currentState.crop}
          currentFilter={currentState.filter}
          currentImg={downloadedImage[currentImageIndex]}
          currentZoom={currentState.zoom}
          onZoomChange={onZoomChangeHandler}
          updateCurrentImageState={updateCurrentImageStateHandler}
        />
        {downloadedImage.length > 1 && (
          <Navigation
            currentImageIndex={currentImageIndex}
            downloadedImageLength={downloadedImage.length}
            setCurrentImageIndex={setCurrentImageIndex}
          />
        )}
        {!editFilter && (
          <ControlButtons
            currentAspect={currentState.aspect}
            currentImageIndex={currentImageIndex}
            currentZoom={currentState.zoom}
            downloadedImage={downloadedImage}
            initialImageState={initialImageState}
            onZoomChange={onZoomChangeHandler}
            setCurrentImageIndex={setCurrentImageIndex}
            setDownloadedImage={setDownloadedImage}
            updateCurrentImageState={updateCurrentImageStateHandler}
          />
        )}
      </div>
      {editFilter && (
        <FiltersChanger
          currentFilter={currentState.filter}
          image={downloadedImage[currentImageIndex]}
          updateCurrentImageState={updateCurrentImageStateHandler}
        />
      )}
    </div>
  )
}
