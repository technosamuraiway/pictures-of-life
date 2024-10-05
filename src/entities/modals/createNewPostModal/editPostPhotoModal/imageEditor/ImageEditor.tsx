import React, { useCallback, useState } from 'react'
import Cropper, { Area, Point } from 'react-easy-crop'

import { getCroppedImg } from './utils'

interface IProps {
  downloadedImage: string[]
  onCropComplete: (croppedImages: string[]) => void
  setDownloadedImage: (downloadedImage: string[]) => void
}

export const ImageEditor = ({ downloadedImage, onCropComplete, setDownloadedImage }: IProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
  const [croppedImages, setCroppedImages] = useState<string[]>([])
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState<number>(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

  const onCropChange = useCallback((crop: Point) => {
    setCrop(crop)
  }, [])

  const onZoomChange = useCallback((zoom: number) => {
    setZoom(zoom)
  }, [])

  const onCropAreaComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const showCroppedImage = useCallback(async () => {
    try {
      if (!croppedAreaPixels) {
        throw new Error('Cropped area pixels not set')
      }

      const croppedImage = await getCroppedImg(
        downloadedImage[currentImageIndex],
        croppedAreaPixels,
        0 // rotation
      )

      setCroppedImages(prev => [...prev, croppedImage])

      if (currentImageIndex < downloadedImage.length - 1) {
        setCurrentImageIndex(prev => prev + 1)
        setCrop({ x: 0, y: 0 })
        setZoom(1)
      } else {
        onCropComplete([...croppedImages, croppedImage])
      }
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels, currentImageIndex, downloadedImage, croppedImages, onCropComplete])

  return (
    <div className={'crop-container'}>
      <Cropper
        aspect={4 / 3}
        crop={crop}
        image={downloadedImage[currentImageIndex]}
        onCropChange={onCropChange}
        onCropComplete={onCropAreaComplete} // Изменено здесь
        onZoomChange={onZoomChange}
        zoom={zoom}
      />
      <div>
        <p>
          Image {currentImageIndex + 1} of {downloadedImage.length}
        </p>
        <button onClick={showCroppedImage} type={'button'}>
          {currentImageIndex < downloadedImage.length - 1 ? 'Next' : 'Finish'}
        </button>
      </div>
    </div>
  )
}
