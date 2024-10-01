import React, { useEffect, useRef, useState } from 'react'
import { Image, Layer, Stage } from 'react-konva'

import Konva from 'konva'

import s from './ImageEditor.module.scss'

interface ImageData {
  aspectRatio: string
  filters: Konva.Filter[]
  id: string
  image: HTMLImageElement
  scale: number
}

interface IProps {
  downloadedImage: (File | string)[]
}
export const ImageEditor = ({ downloadedImage }: IProps) => {
  const [images, setImages] = useState<ImageData[]>([])
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
  const imageRef = useRef<Konva.Image>(null)
  const stageRef = useRef<Konva.Stage>(null)

  useEffect(() => {
    if (imageRef.current) {
      imageRef.current.cache()
      imageRef.current.getLayer()?.batchDraw()
    }
  }, [images, currentImageIndex])

  const loadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const files = e.target.files

    if (downloadedImage) {
      Array.from(downloadedImage).forEach(file => {
        const reader = new FileReader()

        reader.onload = (event: ProgressEvent<FileReader>) => {
          const img = new window.Image()

          img.onload = () => {
            setImages(prevImages => [
              ...prevImages,
              {
                aspectRatio: 'original',
                filters: [],
                id: Date.now().toString(),
                image: img,
                scale: 1,
              },
            ])
          }
          img.src = event.target?.result as string
        }
        reader.readAsDataURL(file as File)
      })
    }
  }

  const applyFilter = (filter: Konva.Filter) => {
    setImages(prevImages => {
      const newImages = [...prevImages]
      const currentImage = newImages[currentImageIndex]

      if (currentImage.filters.includes(filter)) {
        currentImage.filters = currentImage.filters.filter(f => f !== filter)
      } else {
        currentImage.filters.push(filter)
      }

      return newImages
    })
  }

  const changeAspectRatio = (ratio: string) => {
    setImages(prevImages => {
      const newImages = [...prevImages]
      const currentImage = newImages[currentImageIndex]

      currentImage.aspectRatio = ratio

      return newImages
    })

    if (imageRef.current && stageRef.current) {
      const img = imageRef.current
      const stage = stageRef.current

      if (ratio === 'original') {
        img.width(img.getAttr('originalWidth'))
        img.height(img.getAttr('originalHeight'))
      } else {
        const [w, h] = ratio.split(':').map(Number)
        const stageWidth = stage.width()
        const newHeight = (stageWidth * h) / w

        img.width(stageWidth)
        img.height(newHeight)
      }

      img.getLayer()?.batchDraw()
    }
  }

  const handleZoom = (newScale: number) => {
    setImages(prevImages => {
      const newImages = [...prevImages]

      newImages[currentImageIndex].scale = newScale

      return newImages
    })

    if (stageRef.current && imageRef.current) {
      const stage = stageRef.current
      const image = imageRef.current

      const oldScale = stage.scaleX()

      const stageCenter = {
        x: stage.width() / 2,
        y: stage.height() / 2,
      }

      const newPos = {
        x: stageCenter.x - (stageCenter.x - stage.x()) * (newScale / oldScale),
        y: stageCenter.y - (stageCenter.y - stage.y()) * (newScale / oldScale),
      }

      stage.scale({ x: newScale, y: newScale })
      stage.position(newPos)
      stage.batchDraw()
    }
  }

  // const downloadImage = () => {
  //   if (stageRef.current) {
  //     const dataURL = stageRef.current.toDataURL()
  //     const link = document.createElement('a')
  //
  //     link.download = 'edited-image.png'
  //     link.href = dataURL
  //     document.body.appendChild(link)
  //     link.click()
  //     document.body.removeChild(link)
  //   }
  // }

  const currentImage = images[currentImageIndex]

  return (
    <div>
      {/*<input accept={'image/*'} multiple onChange={loadImage} type={'file'} />*/}
      {images.length > 0 && (
        <>
          <div>
            {images.map((img, index) => (
              <button key={img.id} onClick={() => setCurrentImageIndex(index)}>
                Изображение {index + 1}
              </button>
            ))}
          </div>
          <div>
            <button onClick={() => applyFilter(Konva.Filters.Grayscale)}>Черно-белый</button>
            <button onClick={() => applyFilter(Konva.Filters.Brighten)}>Яркость +</button>
            <button onClick={() => applyFilter(Konva.Filters.Invert)}>Инвертировать</button>
            <button onClick={() => applyFilter(Konva.Filters.Blur)}>Размытие</button>
            <button onClick={() => applyFilter(Konva.Filters.Sepia)}>Сепия</button>
          </div>
          <div>
            <button onClick={() => changeAspectRatio('original')}>Оригинал</button>
            <button onClick={() => changeAspectRatio('1:1')}>1:1</button>
            <button onClick={() => changeAspectRatio('4:3')}>4:3</button>
            <button onClick={() => changeAspectRatio('16:9')}>16:9</button>
          </div>
          {/*<button onClick={downloadImage}>Скачать изображение</button>*/}
          <div>
            <label htmlFor={'zoom-slider'}>Зум: {Math.round(currentImage.scale * 100)}%</label>
            <input
              id={'zoom-slider'}
              max={'3'}
              min={'0.1'}
              onChange={e => handleZoom(parseFloat(e.target.value))}
              step={'0.1'}
              type={'range'}
              value={currentImage.scale}
            />
          </div>
          <Stage draggable height={500} ref={stageRef} width={500}>
            <Layer>
              <Image
                draggable
                filters={currentImage.filters}
                height={currentImage.image.height}
                image={currentImage.image}
                originalHeight={currentImage.image.height}
                originalWidth={currentImage.image.width}
                ref={imageRef}
                width={currentImage.image.width}
                x={0}
                y={0}
              />
            </Layer>
          </Stage>
        </>
      )}
    </div>
  )
}
