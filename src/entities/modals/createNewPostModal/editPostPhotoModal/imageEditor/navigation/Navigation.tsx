import { Dispatch, SetStateAction } from 'react'

import { LeftIcon } from '@public/LeftIcon'
import { RightIcon } from '@public/RightIcon'

import s from './Navigation.module.scss'

import { NavArrow } from './navArrow/NavArrow'
import { PaginationSlider } from './paginationSlider/PaginationSlider'

interface IProps {
  currentImageIndex: number
  downloadedImageLength: number
  setCurrentImageIndex: Dispatch<SetStateAction<number>>
}
export const Navigation = ({
  currentImageIndex,
  downloadedImageLength,
  setCurrentImageIndex,
}: IProps) => {
  const onPreviousArrowClickHandler = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(prev => prev - 1)
    }
  }

  const onNextArrowClickHandler = () => {
    if (currentImageIndex < downloadedImageLength - 1) {
      setCurrentImageIndex(prev => prev + 1)
    }
  }

  const onPaginationClickHandler = (index: number) => {
    setCurrentImageIndex(index)
  }

  return (
    <>
      {currentImageIndex !== 0 && (
        <NavArrow arrowCN={s.arrowPrev} onArrowClick={onPreviousArrowClickHandler}>
          <LeftIcon className={s.arrow} />
        </NavArrow>
      )}

      {currentImageIndex !== downloadedImageLength - 1 && (
        <NavArrow arrowCN={s.arrowNext} onArrowClick={onNextArrowClickHandler}>
          <RightIcon className={s.arrow} />
        </NavArrow>
      )}
      <PaginationSlider
        currentIndex={currentImageIndex}
        onDotClick={onPaginationClickHandler}
        totalItems={downloadedImageLength}
      />
    </>
  )
}
