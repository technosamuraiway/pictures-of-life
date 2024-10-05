import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react'
import Cropper, { Area, Point } from 'react-easy-crop'

import s from './ImageEditor.module.scss'

import { getCroppedImg } from './utils'

interface IProps {
  downloadedImage: string[]
  onComplete: (croppedImages: string[]) => void
  setDownloadedImage: Dispatch<SetStateAction<string[]>>
}

interface ImageState {
  aspect: number
  crop: Point
  croppedAreaPixels: Area | null
  filter: string
  zoom: number
}

export const ImageEditor = memo(({ downloadedImage, onComplete, setDownloadedImage }: IProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
  const [imageStates, setImageStates] = useState<ImageState[]>([])

  useEffect(() => {
    if (downloadedImage.length > 0) {
      setImageStates(
        downloadedImage.map(() => ({
          aspect: 4 / 3,
          crop: { x: 0, y: 0 },
          croppedAreaPixels: null,
          filter: 'none',
          zoom: 1,
        }))
      )
    }
  }, [downloadedImage])

  const currentState = imageStates[currentImageIndex] || {
    aspect: 4 / 3,
    crop: { x: 0, y: 0 },
    croppedAreaPixels: null,
    filter: 'none',
    zoom: 1,
  }

  const updateCurrentImageState = (newState: Partial<ImageState>) => {
    setImageStates(prev => {
      const newStates = [...prev]

      if (newStates[currentImageIndex]) {
        newStates[currentImageIndex] = { ...newStates[currentImageIndex], ...newState }
      }

      return newStates
    })
  }

  const onCropChange = useCallback(
    (crop: Point) => {
      updateCurrentImageState({ crop })
    },
    [currentImageIndex]
  )

  const onZoomChange = useCallback(
    (zoom: number) => {
      updateCurrentImageState({ zoom })
    },
    [currentImageIndex]
  )

  const onAspectChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      updateCurrentImageState({ aspect: Number(event.target.value) })
    },
    [currentImageIndex]
  )

  const onFilterChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      updateCurrentImageState({ filter: event.target.value })
    },
    [currentImageIndex]
  )

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      updateCurrentImageState({ croppedAreaPixels })
    },
    [currentImageIndex]
  )

  const processImage = useCallback(async () => {
    try {
      if (!currentState.croppedAreaPixels) {
        throw new Error('Cropped area pixels not set')
      }

      return await getCroppedImg(
        downloadedImage[currentImageIndex],
        currentState.croppedAreaPixels,
        0, // rotation
        currentState.filter
      )
    } catch (e) {
      console.error(e)

      return null
    }
  }, [currentImageIndex, downloadedImage, currentState])

  const handleNext = useCallback(async () => {
    const croppedImage = await processImage()

    if (croppedImage) {
      setDownloadedImage(prev => {
        const newImages = [...prev]

        newImages[currentImageIndex] = croppedImage

        return newImages
      })
    }

    if (currentImageIndex < downloadedImage.length - 1) {
      setCurrentImageIndex(prev => prev + 1)
    } else {
      onComplete(downloadedImage)
    }
  }, [currentImageIndex, downloadedImage, processImage, setDownloadedImage, onComplete])

  const handlePrevious = useCallback(async () => {
    const croppedImage = await processImage()

    if (croppedImage) {
      setDownloadedImage(prev => {
        const newImages = [...prev]

        newImages[currentImageIndex] = croppedImage

        return newImages
      })
    }

    if (currentImageIndex > 0) {
      setCurrentImageIndex(prev => prev - 1)
    }
  }, [currentImageIndex, processImage, setDownloadedImage])

  return (
    <div className={s.editorWrapper}>
      <Cropper
        aspect={currentState.aspect}
        classes={{ containerClassName: s.cropperContainer }}
        crop={currentState.crop}
        image={downloadedImage[currentImageIndex]}
        onCropChange={onCropChange}
        onCropComplete={onCropComplete}
        onZoomChange={onZoomChange}
        style={{
          mediaStyle: {
            filter: currentState.filter,
          },
        }}
        zoom={currentState.zoom}
      />

      <div className={s.buttonsWrapper}>
        {/*<div className={s.controlSection}>*/}
        {/*  <label htmlFor={'zoom'}>Zoom</label>*/}
        {/*  <input*/}
        {/*    className={s.slider}*/}
        {/*    id={'zoom'}*/}
        {/*    max={'3'}*/}
        {/*    min={'1'}*/}
        {/*    onChange={e => onZoomChange(Number(e.target.value))}*/}
        {/*    step={'0.1'}*/}
        {/*    type={'range'}*/}
        {/*    value={currentState.zoom}*/}
        {/*  />*/}
        {/*</div>*/}
        {/*<div className={s.controlSection}>*/}
        {/*  <label htmlFor={'aspect'}>Aspect Ratio</label>*/}
        {/*  <select*/}
        {/*    className={s.select}*/}
        {/*    id={'aspect'}*/}
        {/*    onChange={onAspectChange}*/}
        {/*    value={currentState.aspect}*/}
        {/*  >*/}
        {/*    <option value={1}>1:1</option>*/}
        {/*    <option value={4 / 3}>4:3</option>*/}
        {/*    <option value={16 / 9}>16:9</option>*/}
        {/*  </select>*/}
        {/*</div>*/}
        {/*<div className={s.controlSection}>*/}
        {/*  <label htmlFor={'filter'}>Filter</label>*/}
        {/*  <select*/}
        {/*    className={s.select}*/}
        {/*    id={'filter'}*/}
        {/*    onChange={onFilterChange}*/}
        {/*    value={currentState.filter}*/}
        {/*  >*/}
        {/*    <option value={'none'}>None</option>*/}
        {/*    <option value={'grayscale(100%)'}>Grayscale</option>*/}
        {/*    <option value={'sepia(100%)'}>Sepia</option>*/}
        {/*    <option value={'saturate(200%)'}>Saturate</option>*/}
        {/*  </select>*/}
        {/*</div>*/}
      </div>
      {/*<div className={s.navigation}>*/}
      {/*  <button className={s.button} disabled={currentImageIndex === 0} onClick={handlePrevious}>*/}
      {/*    Previous*/}
      {/*  </button>*/}
      {/*  <p>*/}
      {/*    Image {currentImageIndex + 1} of {downloadedImage.length}*/}
      {/*  </p>*/}
      {/*  <button className={s.button} onClick={handleNext}>*/}
      {/*    {currentImageIndex < downloadedImage.length - 1 ? 'Next' : 'Finish'}*/}
      {/*  </button>*/}
      {/*</div>*/}
    </div>
  )
})
