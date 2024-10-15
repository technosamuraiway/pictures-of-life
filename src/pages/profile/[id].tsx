import { useMemo } from 'react'

import { useAppSelector, useGetPostsByUserNameQuery, useGetProfileQuery } from '@/services'
import { meSelectorData } from '@/services/selectors/auth.selectors'
import { InitLoader, MetaHead } from '@/shared'
import { getLayoutWithNav } from '@/widgets'
import Image from 'next/image'

import { ProfileInfo } from './_ui/ProfileInfo/ProfileInfo'

function Profile() {
  const meRequestData = useAppSelector(meSelectorData)
  const { data: profileData, isLoading: isProfileLoading } = useGetProfileQuery(undefined, {
    skip: !meRequestData,
  })

  const { data: postsData, isLoading: isPostsLoading } = useGetPostsByUserNameQuery(
    { userName: profileData?.userName || '' },
    { skip: !profileData }
  )

  console.log(postsData)

  // массив постов
  const postsImagesArray = useMemo(() => {
    return postsData?.items.reduce((acc, post) => {
      acc.push(post.avatarOwner)

      return acc
    }, [] as Array<string>)
  }, [postsData])

  if (isProfileLoading || isPostsLoading) {
    return <InitLoader />
  }

  return (
    <>
      <MetaHead title={'Profile info'} />
      <div style={{ width: '100%' }}>
        <ProfileInfo
          about={profileData?.aboutMe || 'no info'}
          avatar={profileData?.avatars[0].url || ''}
          userName={profileData?.userName || 'no info'}
        />

        <div>
          {postsImagesArray && postsImagesArray.length > 0
            ? postsImagesArray.map((item, index) => (
                <Image
                  alt={`image-${index}`}
                  height={200}
                  key={index}
                  src={item}
                  style={{ objectFit: 'cover' }}
                  width={200}
                />
              ))
            : 'No images'}
        </div>
      </div>
    </>
  )
}

Profile.getLayout = getLayoutWithNav
export default Profile
