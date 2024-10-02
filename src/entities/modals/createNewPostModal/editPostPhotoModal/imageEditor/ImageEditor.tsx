import { useEffect, useRef, useState } from 'react'
import { Image, Layer, Stage } from 'react-konva'

import { ScaleSlider } from '@/entities/components/scaleSlider/ScaleSlider'
import { ActiveZoomIcon } from '@public/createPost/ActiveZoomIcon'
import { DefaultZoomIcon } from '@public/createPost/DefaultZoomIcon'
import { ExpandIcon } from '@public/createPost/ExpandIcon'
import { Dropdown, Typography } from '@technosamurai/techno-ui-kit'
import clsx from 'clsx'
import Konva from 'konva'

import s from './ImageEditor.module.scss'

import { ConfirmReset } from './confirmReset/ConfirmReset'
import { useChangeImageRatio } from './hooks/useChangeImageRatio'
import { useShowStartImage } from './hooks/useShowStartImage'

export interface ImageData {
  aspectRatio: string
  filters: Konva.Filter[]
  id: string
  image: HTMLImageElement
  scale: number
}

interface IProps {
  downloadedImage: (File | string)[]
}

export interface IPosition {
  x: number
  y: number
}

export const ImageEditor = ({ downloadedImage }: IProps) => {
  const [images, setImages] = useState<ImageData[]>([])

  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
  const [imagePosition, setImagePosition] = useState<IPosition>({ x: 0, y: 0 })
  const imageRef = useRef<Konva.Image>(null)
  const stageRef = useRef<Konva.Stage>(null)
  const currentImage = images[currentImageIndex]
  const [openRatioDropDown, setOpenRatioDropDown] = useState<boolean>(false)
  const [openSliderDropDown, setOpenSliderDropDown] = useState<boolean>(false)
  const [activeRatioItem, setActiveRatioItem] = useState<number>(1)

  const [openResetModal, setOpenResetModal] = useState<boolean>(false)

  const { showDownloadedImage } = useShowStartImage(downloadedImage, setImages)

  const { ratioDropDownItems } = useChangeImageRatio(
    setActiveRatioItem,
    stageRef,
    imageRef,
    setImages,
    currentImageIndex,
    setImagePosition
  )

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

  const onZoomChangeHandler = (newScale: number[]) => {
    setImages(prevImages => {
      const newImages = [...prevImages]

      newImages[currentImageIndex].scale = newScale[0]

      return newImages
    })

    if (stageRef.current && imageRef.current) {
      const stage = stageRef.current
      const image = imageRef.current

      const oldScale = image.scaleX()
      const oldPos = image.position()

      const newWidth = (image.width() * newScale[0]) / oldScale
      const newHeight = (image.height() * newScale[0]) / oldScale

      const x = (stage.width() - newWidth) / 2
      const y = (stage.height() - newHeight) / 2

      image.scale({ x: newScale[0], y: newScale[0] })

      setImagePosition({ x, y })

      image.position({ x, y })

      image.getLayer()?.batchDraw()
    }
  }

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

    setOpenResetModal(false)
  }

  return (
    <div className={s.wrapper}>
      {images.length > 0 && (
        <>
          <div className={s.buttonsWrapper}>
            {/*<div>*/}
            {/*  {images.map((img, index) => (*/}
            {/*    <button key={img.id} onClick={() => setCurrentImageIndex(index)}>*/}
            {/*      Изображение {index + 1}*/}
            {/*    </button>*/}
            {/*  ))}*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*  <button onClick={() => applyFilter(Konva.Filters.Grayscale)}>Черно-белый</button>*/}
            {/*  <button onClick={() => applyFilter(Konva.Filters.Brighten)}>Яркость +</button>*/}
            {/*  <button onClick={() => applyFilter(Konva.Filters.Invert)}>Инвертировать</button>*/}
            {/*  <button onClick={() => applyFilter(Konva.Filters.Blur)}>Размытие</button>*/}
            {/*  <button onClick={() => applyFilter(Konva.Filters.Sepia)}>Сепия</button>*/}
            {/*</div>*/}

            <Dropdown.Root
              contentAlign={'start'}
              contentCN={s.dropdownContent}
              contentSide={'top'}
              onOpenChange={setOpenRatioDropDown}
              open={openRatioDropDown}
              trigger={
                <ExpandIcon
                  className={clsx(
                    s.triggerIcon,
                    openRatioDropDown ? s.activeTriggerIcon : s.defaultTriggerIcon
                  )}
                />
              }
              triggerCN={clsx(s.triggerBtn)}
              withArrow={false}
            >
              {ratioDropDownItems.map(item => {
                return (
                  <Dropdown.Item
                    className={clsx(
                      s.dropDownItem,
                      activeRatioItem === item.activeRatio && s.activeDropDownItem
                    )}
                    key={`${item.ratioName} - id`}
                    onClick={item.onDropDownItemClick}
                  >
                    <Typography variant={'regular-text-16'}>{item.ratioName}</Typography>
                    {item.itemIcon}
                  </Dropdown.Item>
                )
              })}
            </Dropdown.Root>

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
              triggerCN={clsx(s.triggerBtn)}
              withArrow={false}
            >
              <ScaleSlider
                onScaleChange={onZoomChangeHandler}
                scale={[currentImage.scale]}
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

            <ConfirmReset
              openResetModal={openResetModal}
              resetImageSettings={resetImage}
              setOpenResetModal={setOpenResetModal}
            />
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
