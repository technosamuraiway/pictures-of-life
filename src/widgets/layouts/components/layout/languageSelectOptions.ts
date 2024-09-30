import EnFlagPng from '@public/headerChangeLangBtn/enFlag.png'
import EnFlagWebp from '@public/headerChangeLangBtn/enFlag.webp'
import RuFlagPng from '@public/headerChangeLangBtn/ruFlag.png'
import RuFlagWebp from '@public/headerChangeLangBtn/ruFlag.webp'

/*
 * ❗ если брать напрямую картинку из public, то у картинки будет тип StaticImageData
 * а header ожидает тип string => нужно использовать свойство src объектов StaticImageData
 * которое возвращает строку с путем к изображению
 *
 * при таком подходе Next.js все еще будет оптимизировать изображения, но теряются некоторые
 * преимущества, такие как автоматическое определение размеров изображения
 * */

export const languageSelectOptions = [
  { icon: { png: EnFlagPng.src, webp: EnFlagWebp.src }, label: 'English', value: 'en' },
  { icon: { png: RuFlagPng.src, webp: RuFlagWebp.src }, label: 'Русский', value: 'ru' },
]
