import { useMemo } from 'react'

import { Scrollbar, Typography } from '@technosamurai/techno-ui-kit'
import clsx from 'clsx'
import Image from 'next/image'
import { v4 as uuid } from 'uuid'

import s from './FiltersChanger.module.scss'

import { ImageState } from '../utils/types'

interface FilterOption {
  name: string
  value: string
}

interface IProps {
  currentFilter: string
  image: string
  updateCurrentImageState: (newState: Partial<ImageState>) => void
}

export const FiltersChanger = ({ currentFilter, image, updateCurrentImageState }: IProps) => {
  const filterOptions: FilterOption[] = useMemo(
    () => [
      { name: 'Original', value: 'none' },
      { name: 'Grayscale', value: 'grayscale(100%)' },
      { name: 'Sepia', value: 'sepia(100%)' },
      { name: 'Saturate', value: 'saturate(200%)' },
      { name: 'Desaturate', value: 'saturate(50%)' },
      { name: 'Invert', value: 'invert(100%)' },
      { name: 'Blur', value: 'blur(2px)' },
      { name: 'Brightness', value: 'brightness(150%)' },
      { name: 'Contrast', value: 'contrast(150%)' },
      { name: 'Hue Rotate', value: 'hue-rotate(90deg)' },
      { name: 'Vintage', value: 'sepia(50%) hue-rotate(-30deg) saturate(140%)' },
      { name: 'Cool', value: 'saturate(150%) hue-rotate(30deg)' },
      { name: 'Warm', value: 'saturate(150%) hue-rotate(-30deg)' },
      { name: 'Dramatic', value: 'contrast(150%) brightness(90%)' },
      { name: 'Fade', value: 'opacity(70%) brightness(110%)' },
      { name: 'Noir', value: 'grayscale(100%) contrast(150%) brightness(80%)' },
      { name: 'Retro', value: 'sepia(50%) saturate(120%) contrast(110%)' },
      { name: 'Pastel', value: 'saturate(80%) brightness(110%) contrast(90%)' },
      { name: 'Vivid', value: 'saturate(200%) contrast(110%) brightness(110%)' },
      { name: 'Muted', value: 'saturate(50%) brightness(90%) contrast(90%)' },
    ],
    []
  )

  const onFilterChangeHandler = (filter: string) => {
    updateCurrentImageState({ filter })
  }

  return (
    <Scrollbar maxHeight={500}>
      <div className={s.filtersWrapper}>
        {filterOptions.map(filter => (
          <div
            className={s.filterOption}
            key={uuid()}
            onClick={() => onFilterChangeHandler(filter.value)}
          >
            <Image
              alt={filter.name}
              className={clsx(s.filterImage, currentFilter === filter.value && s.activeFilter)}
              height={108}
              src={image}
              style={{ filter: filter.value }}
              width={108}
            />
            <Typography variant={'regular-text-16'}>{filter.name}</Typography>
          </div>
        ))}
      </div>
    </Scrollbar>
  )
}
