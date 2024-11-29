import { RequestLineLoader } from '@/shared'
import { Tabs } from '@technosamurai/techno-ui-kit'
import Image from 'next/image'

import s from './UserPostsImages.module.scss'

import { usePostsImages } from './lib/useUserImages'

interface IProps {
  value: string
}

export const UserPostsImages = ({ value }: IProps) => {
  const { getPostsImagesIsLoading, imagesData, ref } = usePostsImages()

  return (
    <>
      {getPostsImagesIsLoading && <RequestLineLoader />}
      <Tabs.Content value={value}>
        <div className={s.wrapper}>
          {imagesData.map((el, i) => {
            return (
              <Image
                alt={'post image'}
                className={s.img}
                height={228}
                key={i}
                priority
                src={el.url}
                width={240}
              />
            )
          })}
        </div>
        <div ref={ref} style={{ height: '30px', width: '100%' }} />
      </Tabs.Content>
    </>
  )
}
