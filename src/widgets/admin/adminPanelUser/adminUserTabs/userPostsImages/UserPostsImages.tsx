import { RequestLineLoader, useRouterLocaleDefinition } from '@/shared'
import { Tabs, Typography } from '@technosamurai/techno-ui-kit'
import Image from 'next/image'

import s from './UserPostsImages.module.scss'

import { usePostsImages } from './lib/useUserImages'

interface IProps {
  value: string
}

export const UserPostsImages = ({ value }: IProps) => {
  const t = useRouterLocaleDefinition()
  const { getPostsImagesIsLoading, imagesData, ref } = usePostsImages()

  return (
    <>
      {getPostsImagesIsLoading && <RequestLineLoader />}
      <Tabs.Content value={value}>
        {imagesData?.length === 0 ? (
          <Typography as={'h2'} style={{ textAlign: 'center' }} variant={'h1'}>
            {t.admin.userList.tabs.files.emptyTable}
          </Typography>
        ) : (
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
        )}
        <div ref={ref} style={{ height: '30px', width: '100%' }} />
      </Tabs.Content>
    </>
  )
}
