import { ReactNode } from 'react'

import { LeftIcon } from '@public/LeftIcon'
import { RightIcon } from '@public/RightIcon'
import clsx from 'clsx'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { v4 as uuidv4 } from 'uuid'

import s from './SwiperSlider.module.scss'

interface SlideData {
  content: ReactNode // можно передавать как строку, так и React элементы
  id?: number
}

interface ICustomSwiperProps {
  customClass?: string // Дополнительный класс для кастомизации стилей
  loop?: boolean // Зациклить ли слайды
  navIconCN?: string // Дополнительный класс для кастомизации стилей
  navigation?: boolean // Включить ли навигацию (стрелки)
  pagActiveBulletCN?: string // Дополнительный класс для кастомизации стилей
  pagBulletCN?: string // Дополнительный класс для кастомизации стилей
  paginationCN?: string // Дополнительный класс для кастомизации стилей
  paginationClickable?: boolean // Включить ли кликабельную пагинацию
  slides: SlideData[] // Массив объектов с данными для слайдов
  slidesPerView?: number // Количество отображаемых слайдов
  spaceBetween?: number // Расстояние между слайдами
  swiperSlideCN?: string // Дополнительный класс для кастомизации стилей
}

/**
 * Компонент SwiperSlider.
 * @param slides - Массив слайдов, каждый слайд может быть строкой или JSX элементом.
 * @param slidesPerView - Количество слайдов, которые будут видны одновременно (по умолчанию 1).
 * @param spaceBetween - Расстояние между слайдами в пикселях (по умолчанию 30).
 * @param loop - Если true, слайды будут зациклены (по умолчанию true).
 * @param paginationClickable - Если true, кнопки пагинации будут кликабельными (по умолчанию true).
 * @param navigation - Если true, будут отображаться кнопки навигации (по умолчанию true).
 * @param customClass - Кастомный класс для стилей (по умолчанию "mySwiper").
 * @param navIconCN - Кастомный класс для navIcon.
 * @param swiperSlideCN - Кастомный класс для swiperSlide.
 * @param paginationCN - Кастомный класс для pagination.
 * @param pagActiveBulletCN - Кастомный класс для pagActiveBullet.
 * @param pagBulletCN - Кастомный класс для pagActive.
 * @returns Универсальный Swiper компонент.
 */

export function SwiperSlider({
  customClass = 'mySwiper',
  loop = true,
  navIconCN,
  navigation = true,
  pagActiveBulletCN,
  pagBulletCN,
  paginationCN,
  paginationClickable = true,
  slides,
  slidesPerView = 1,
  spaceBetween = 30,
  swiperSlideCN,
}: ICustomSwiperProps) {
  return (
    <Swiper
      className={customClass}
      loop={loop}
      modules={[Pagination, Navigation]}
      navigation={{
        nextEl: `.${s.navigationNext}`,
        prevEl: `.${s.navigationPrev}`,
      }}
      pagination={{
        bulletActiveClass: clsx(
          'swiper-pagination-bullet-active',
          s.paginationBulletActive,
          pagActiveBulletCN
        ),
        bulletClass: clsx('swiper-pagination-bullet', s.paginationBullet, pagBulletCN),
        clickable: paginationClickable,
        el: `.${s.pagination}`,
      }}
      slidesPerView={slidesPerView}
      spaceBetween={spaceBetween}
    >
      {slides.map(slide => (
        <SwiperSlide className={swiperSlideCN} key={slide.id || uuidv4()}>
          {slide.content}
        </SwiperSlide>
      ))}
      {navigation && (
        <>
          <LeftIcon className={clsx('swiper-button-prev', s.navigationPrev, navIconCN)} />
          <RightIcon className={clsx('swiper-button-next', s.navigationNext, navIconCN)} />
        </>
      )}
      <div className={clsx('swiper-pagination', s.pagination, paginationCN)} />
    </Swiper>
  )
}
