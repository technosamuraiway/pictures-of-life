import { useGetProfileQuery } from '@/services'
import { MetaHead, RequestLineLoader } from '@/shared'
import { getLayoutWithNav } from '@/widgets'
import Image from 'next/image'

function Profile() {
  const { data, isLoading } = useGetProfileQuery()

  const avatarsList = data?.avatars.map(el => (
    <Image alt={'avatar item'} height={200} key={el.createdAt} src={el.url} width={200} />
  ))

  return (
    <>
      {isLoading && <RequestLineLoader />}
      <MetaHead title={'Profile info'} />
      <div>{avatarsList}</div>
    </>
  )
}

Profile.getLayout = getLayoutWithNav
export default Profile
