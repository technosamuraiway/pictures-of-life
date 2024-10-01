import type { IPosition, ImageData } from '../ImageEditor'

import { ReactNode, RefObject } from 'react'

import { useRouterLocaleDefinition } from '@/shared'
import { EmptyAvatar } from '@public/profileAvatar/EmptyAvatar'
import Konva from 'konva'

import s from '../ImageEditor.module.scss'

interface RatioDropDownItem {
  activeRatio: number
  itemIcon: ReactNode
  onDropDownItemClick: () => void
  ratioName: string
}

export const useChangeImageRatio = (
  setActiveRatioItem: (activeRatio: number) => void,
  stageRef: RefObject<Konva.Stage>,
  imageRef: RefObject<Konva.Image>,
  setImages: (images: ((prevImages: ImageData[]) => ImageData[]) | ImageData[]) => void,
  currentImageIndex: number,
  setImagePosition: (position: IPosition) => void
) => {
  const t = useRouterLocaleDefinition()

  const ratioDropDownItems: RatioDropDownItem[] = [
    {
      activeRatio: 1,
      itemIcon: <EmptyAvatar className={s.ratioOriginalIcon} />,
      onDropDownItemClick: () => onDropDownItemClickHandler(1, 'original'),
      ratioName: t.createNewPost.editPhotoModal.originalRatio,
    },
    {
      activeRatio: 2,
      itemIcon: <div className={s.ratioSquareIcon} />,
      onDropDownItemClick: () => onDropDownItemClickHandler(2, '1:1'),
      ratioName: '1:1',
    },
    {
      activeRatio: 3,
      itemIcon: <div className={s.ratioPhoneIcon} />,
      onDropDownItemClick: () => onDropDownItemClickHandler(3, '4:5'),
      ratioName: '4:5',
    },
    {
      activeRatio: 4,
      itemIcon: <div className={s.ratioDesktopIcon} />,
      onDropDownItemClick: () => onDropDownItemClickHandler(4, '16:9'),
      ratioName: '16:9',
    },
  ]

  function onDropDownItemClickHandler(activeRatio: number, ratioName: string) {
    changeAspectRatio(ratioName)
    setActiveRatioItem(activeRatio)
  }

  const changeAspectRatio = (ratioName: string) => {
    setImages(prevImages => {
      const newImages = [...prevImages]
      const currentImage = newImages[currentImageIndex]

      currentImage.aspectRatio = ratioName

      return newImages
    })

    if (imageRef.current && stageRef.current) {
      const img = imageRef.current
      const stage = stageRef.current

      let newWidth, newHeight

      if (ratioName === 'original') {
        newWidth = img.getAttr('originalWidth')
        newHeight = img.getAttr('originalHeight')
      } else {
        const [w, h] = ratioName.split(':').map(Number)
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

  return {
    ratioDropDownItems,
  }
}
