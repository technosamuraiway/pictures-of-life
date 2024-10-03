import { ReactNode } from 'react'

import clsx from 'clsx'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { v4 as uuidv4 } from 'uuid'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import s from './SwiperSlider.module.scss'

interface SlideData {
  content: ReactNode // можно передавать как строку, так и React элементы
  id?: number
}

interface ICustomSwiperProps {
  customClass?: string // Дополнительный класс для кастомизации стилей
  loop?: boolean // Зациклить ли слайды
  navigation?: boolean // Включить ли навигацию (стрелки)
  paginationClickable?: boolean // Включить ли кликабельную пагинацию
  slides: SlideData[] // Массив объектов с данными для слайдов
  slidesPerView?: number // Количество отображаемых слайдов
  spaceBetween?: number // Расстояние между слайдами
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
 * @returns Универсальный Swiper компонент.
 */
export function SwiperSlider({
  customClass = 'mySwiper',
  loop = true,
  navigation = true,
  paginationClickable = true,
  slides,
  slidesPerView = 1,
  spaceBetween = 30,
}: ICustomSwiperProps) {
  return (
    <Swiper
      className={clsx(s.swiper, customClass)}
      loop={loop}
      modules={[Pagination, Navigation]}
      navigation={navigation}
      pagination={{ clickable: paginationClickable }}
      slidesPerView={slidesPerView}
      spaceBetween={spaceBetween}
    >
      {slides.map(slide => (
        <SwiperSlide className={s.swiperSlide} key={slide.id || uuidv4()}>
          {slide.content}
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
