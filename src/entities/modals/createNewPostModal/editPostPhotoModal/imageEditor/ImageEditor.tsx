import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import Cropper, { Area, Point } from 'react-easy-crop'
import { toast } from 'react-toastify'

import { useRouterLocaleDefinition } from '@/shared'
import clsx from 'clsx'

import s from './ImageEditor.module.scss'

import { ControlButtons } from './controlButtons/ControlButtons'
import { FiltersChanger } from './filtersChanger/FiltersChanger'
import { Navigation } from './navigation/Navigation'
import { getCroppedImg } from './utils'

interface IProps {
  downloadedImage: string[]
  editFilter: boolean
  onComplete: (croppedImages: string[]) => void
  setDownloadedImage: Dispatch<SetStateAction<string[]>>
}

export interface ImageState {
  aspect: null | number
  crop: Point
  croppedAreaPixels: Area | null
  filter: string
  zoom: number
}

const initialImageState: ImageState = {
  aspect: 4 / 3,
  crop: { x: 0, y: 0 },
  croppedAreaPixels: null,
  filter: 'none',
  zoom: 1,
}

const MAX_IMAGES = 10

export const ImageEditor = memo(
  ({ downloadedImage, editFilter, onComplete, setDownloadedImage }: IProps) => {
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
    const [imageStates, setImageStates] = useState<ImageState[]>([])
    const t = useRouterLocaleDefinition()

    useEffect(() => {
      if (downloadedImage.length > 0 && downloadedImage.length <= MAX_IMAGES) {
        setImageStates(downloadedImage.map(() => ({ ...initialImageState })))
      } else if (downloadedImage.length > MAX_IMAGES) {
        toast.error(t.avatarChange.errorMaxCount)
        setDownloadedImage(prevImages => prevImages.slice(0, MAX_IMAGES))
      }
    }, [downloadedImage, setDownloadedImage, t.avatarChange.errorMaxCount])

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

    const onFilterChange = useCallback(
      (event: ChangeEvent<HTMLSelectElement>) => {
        updateCurrentImageStateHandler({ filter: event.target.value })
      },
      [currentImageIndex]
    )

    const onCropChange = useCallback(
      (crop: Point) => {
        updateCurrentImageStateHandler({ crop })
      },
      [currentImageIndex]
    )

    const onCropComplete = useCallback(
      (croppedArea: Area, croppedAreaPixels: Area) => {
        updateCurrentImageStateHandler({ croppedAreaPixels })
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

    return (
      <div className={s.baseWrapper}>
        <div className={s.editorWrapper}>
          <div className={s.cropperContainer}>
            <Cropper
              aspect={currentState.aspect !== null ? currentState.aspect : undefined}
              crop={currentState.crop}
              image={downloadedImage[currentImageIndex]}
              onCropChange={onCropChange}
              onCropComplete={onCropComplete}
              onZoomChange={onZoomChangeHandler}
              style={{
                mediaStyle: {
                  filter: currentState.filter,
                },
              }}
              zoom={currentState.zoom}
            />
          </div>
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

          {downloadedImage.length > 1 && (
            <Navigation
              currentImageIndex={currentImageIndex}
              downloadedImageLength={downloadedImage.length}
              setCurrentImageIndex={setCurrentImageIndex}
            />
          )}

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
        {editFilter && <FiltersChanger />}
      </div>
    )
  }
)
