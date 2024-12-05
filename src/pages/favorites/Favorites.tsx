import { MetaHead, useRouterLocaleDefinition } from '@/shared'
import { getLayoutWithNav } from '@/widgets'
import { Typography } from '@technosamurai/techno-ui-kit'
import Image from 'next/image'

import s from './Favotites.module.scss'

const Favorites = () => {
  const t = useRouterLocaleDefinition()
  const images = [
    '/favoritesIcons/icon1.jpg',
    '/favoritesIcons/icon2.jpg',
    '/favoritesIcons/icon3.jpg',
    '/favoritesIcons/icon4.jpg',
    '/favoritesIcons/icon5.jpg',
    '/favoritesIcons/icon6.jpg',
    '/favoritesIcons/icon7.jpg',
    '/favoritesIcons/icon8.jpg',
    '/favoritesIcons/icon9.jpg',
    '/favoritesIcons/icon10.jpg',
    '/favoritesIcons/icon11.jpg',
    '/favoritesIcons/icon12.jpg',
    '/favoritesIcons/icon13.jpg',
    '/favoritesIcons/icon14.jpg',
    '/favoritesIcons/icon15.jpg',
    '/favoritesIcons/icon16.jpg',
  ]

  return (
    <>
      <MetaHead title={t.statisticsPage.favoritesTitle} />
      <div className={s.favoritesContent}>
        <Typography variant={'h1'}>{t.statisticsPage.favorites}</Typography>
        <div className={s.grid}>
          {images.map((src, index) => (
            <div className={s.gridItem} key={index}>
              <Image
                alt={`Favorite ${index + 1}`}
                className={s.image}
                height={230}
                src={src}
                width={300}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

Favorites.getLayout = getLayoutWithNav
export default Favorites
