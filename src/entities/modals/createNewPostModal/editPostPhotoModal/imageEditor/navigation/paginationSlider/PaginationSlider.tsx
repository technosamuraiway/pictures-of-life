import clsx from 'clsx'
import { v4 as uuid } from 'uuid'

import s from './PaginationSlider.module.scss'

interface IProps {
  currentIndex: number
  onDotClick: (index: number) => void
  totalItems: number
}

export const PaginationSlider = ({ currentIndex, onDotClick, totalItems }: IProps) => {
  return (
    <div className={s.paginationWrapper}>
      {Array.from({ length: totalItems }).map((_, index) => (
        <button
          className={clsx(s.paginationDot, index === currentIndex && s.activeDot)}
          key={uuid()}
          onClick={() => onDotClick(index)}
          type={'button'}
        />
      ))}
    </div>
  )
}
