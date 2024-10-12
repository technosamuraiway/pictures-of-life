import { IProfileResponse, useGetProfileQuery } from '@/services'
import { MetaHead, RequestLineLoader, useRouterLocaleDefinition } from '@/shared'
import { getLayoutWithNav } from '@/widgets'

// export const getStaticProps = async () => {
//   // const data = await API.profileAPI.getProfile().then(res => res.json())
//
//   const data = await fetch('https://rickandmortyapi.com/api/character', { method: 'GET' }).then(
//     res => res.json()
//   )
//
//   if (!data) {
//     return {
//       notFound: true,
//     }
//   }
//
//   return {
//     props: {
//       data,
//     },
//   }
// }

interface iProps {
  data: IProfileResponse
}

function Profile({ data }: iProps) {
  const t = useRouterLocaleDefinition()

  const { data: profileData, isLoading: getProfileIsLoading } = useGetProfileQuery()

  return (
    <>
      {getProfileIsLoading && <RequestLineLoader />}
      <MetaHead title={t.profilePage.title} />
      <>PROFILE</>
    </>
  )
}

Profile.getLayout = getLayoutWithNav
export default Profile
