import React, { useEffect, useRef, useState } from 'react'
import { Image, Layer, Stage } from 'react-konva'

import { useRouterLocaleDefinition } from '@/shared'
import { ExpandIcon } from '@public/createPost/ExpandIcon'
import { EmptyAvatar } from '@public/profileAvatar/EmptyAvatar'
import { Dropdown, Typography } from '@technosamurai/techno-ui-kit'
import clsx from 'clsx'
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
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 })
  const imageRef = useRef<Konva.Image>(null)
  const stageRef = useRef<Konva.Stage>(null)

  const [openRatioDropDown, setOpenRatioDropDown] = useState<boolean>(false)
  const [activeRatioItem, setActiveRatioItem] = useState<number>(1)

  const t = useRouterLocaleDefinition()

  useEffect(() => {
    if (downloadedImage && images.length === 0) {
      showDownloadedImage()
    }

    if (imageRef.current && stageRef.current) {
      imageRef.current.cache()

      const stage = stageRef.current
      const image = imageRef.current

      const stageWidth = stage.width()
      const stageHeight = stage.height()
      const imageWidth = image.width()
      const imageHeight = image.height()

      const x = (stageWidth - imageWidth) / 2
      const y = (stageHeight - imageHeight) / 2

      setImagePosition({ x, y })

      image.position({ x, y })
      image.getLayer()?.batchDraw()
    }
  }, [images, currentImageIndex])

  // ==================== Блок работы с загрузкой фото ========================
  const imgOnload = (img: HTMLImageElement) => {
    return setImages(prevImages => [
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

  const showDownloadedImage = () => {
    Array.from(downloadedImage).forEach(file => {
      if (typeof file === 'string') {
        const img = new window.Image()

        img.onload = () => imgOnload(img)

        img.src = file
      } else {
        const reader = new FileReader()

        reader.onload = (event: ProgressEvent<FileReader>) => {
          const img = new window.Image()

          img.onload = () => imgOnload(img)

          img.src = event.target?.result as string
        }
        reader.readAsDataURL(file)
      }
    })
  }
  // ===================================================================

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

      let newWidth, newHeight

      if (ratio === 'original') {
        newWidth = img.getAttr('originalWidth')
        newHeight = img.getAttr('originalHeight')
      } else {
        const [w, h] = ratio.split(':').map(Number)
        const stageWidth = stage.width()

        newWidth = stageWidth
        newHeight = (stageWidth * h) / w
      }

      img.width(newWidth)
      img.height(newHeight)

      const x = (stage.width() - newWidth) / 2
      const y = (stage.height() - newHeight) / 2

      setImagePosition({ x, y })
      img.position({ x, y })

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

      const oldScale = image.scaleX()
      const oldPos = image.position()

      const newWidth = (image.width() * newScale) / oldScale
      const newHeight = (image.height() * newScale) / oldScale

      const x = (stage.width() - newWidth) / 2
      const y = (stage.height() - newHeight) / 2

      image.scale({ x: newScale, y: newScale })
      setImagePosition({ x, y })
      image.position({ x, y })

      image.getLayer()?.batchDraw()
    }
  }

  const currentImage = images[currentImageIndex]

  const handleDragMove = (e: Konva.KonvaEventObject<DragEvent>) => {
    const { x, y } = e.target.position()

    setImagePosition({ x, y })
  }

  const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    const { x, y } = e.target.position()

    setImagePosition({ x, y })
  }

  const resetImage = () => {
    setImages(prevImages => {
      const newImages = [...prevImages]
      const currentImage = newImages[currentImageIndex]

      currentImage.filters = []
      currentImage.aspectRatio = 'original'
      currentImage.scale = 1

      return newImages
    })

    if (imageRef.current && stageRef.current) {
      const img = imageRef.current
      const stage = stageRef.current

      const originalWidth = img.getAttr('originalWidth')
      const originalHeight = img.getAttr('originalHeight')

      img.width(originalWidth)
      img.height(originalHeight)
      img.scale({ x: 1, y: 1 })

      const x = (stage.width() - originalWidth) / 2
      const y = (stage.height() - originalHeight) / 2

      setImagePosition({ x, y })
      img.position({ x, y })

      img.getLayer()?.batchDraw()
    }
  }

  // ====================== Кликаем по item в dropDown =============================
  const onDropDownItemClick = (index: number, ratio: string) => {
    changeAspectRatio(ratio)
    setActiveRatioItem(index)
  }

  return (
    <div className={s.wrapper}>
      {images.length > 0 && (
        <>
          <div className={s.buttonsWrapper}>
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

            <Dropdown.Root
              contentAlign={'start'}
              contentCN={s.dropdownContent}
              contentSide={'top'}
              onOpenChange={setOpenRatioDropDown}
              open={openRatioDropDown}
              trigger={
                <ExpandIcon
                  className={clsx(s.triggerIcon, openRatioDropDown && s.activeTriggerIcon)}
                />
              }
              triggerCN={clsx(s.triggerBtn)}
              withArrow={false}
            >
              <Dropdown.Item
                className={clsx(s.dropDownItem, activeRatioItem === 1 && s.activeDropDownItem)}
                onClick={() => onDropDownItemClick(1, 'original')}
              >
                <Typography variant={'regular-text-16'}>
                  {t.createNewPost.editPhotoModal.originalRatio}
                </Typography>
                <EmptyAvatar className={s.ratioOriginalIcon} />
              </Dropdown.Item>

              <Dropdown.Item
                className={clsx(s.dropDownItem, activeRatioItem === 2 && s.activeDropDownItem)}
                onClick={() => onDropDownItemClick(2, '1:1')}
              >
                <Typography variant={'regular-text-16'}>1:1</Typography>
                <div className={s.ratioSquareIcon} />
              </Dropdown.Item>

              <Dropdown.Item
                className={clsx(s.dropDownItem, activeRatioItem === 3 && s.activeDropDownItem)}
                onClick={() => onDropDownItemClick(3, '4:5')}
              >
                <Typography variant={'regular-text-16'}>4:5</Typography>
                <div className={s.ratioPhoneIcon} />
              </Dropdown.Item>

              <Dropdown.Item
                className={clsx(s.dropDownItem, activeRatioItem === 4 && s.activeDropDownItem)}
                onClick={() => onDropDownItemClick(4, '16:9')}
              >
                <Typography variant={'regular-text-16'}>16:9</Typography>
                <div className={s.ratioDesktopIcon} />
              </Dropdown.Item>
            </Dropdown.Root>

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
            <div>
              <button onClick={resetImage}>Сбросить настройки</button>
            </div>
          </div>
          <Stage height={500} ref={stageRef} width={488}>
            <Layer>
              <Image
                draggable
                filters={currentImage.filters}
                height={currentImage.image.height}
                image={currentImage.image}
                onDragEnd={handleDragEnd}
                onDragMove={handleDragMove}
                originalHeight={currentImage.image.height}
                originalWidth={currentImage.image.width}
                ref={imageRef}
                width={currentImage.image.width}
                x={imagePosition.x}
                y={imagePosition.y}
              />
            </Layer>
          </Stage>
        </>
      )}
    </div>
  )
}
