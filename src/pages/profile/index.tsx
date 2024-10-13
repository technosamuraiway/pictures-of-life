import { IProfileResponse } from '@/services'
import { API } from '@/services/api-SSG-axios/inctagram-SSG-axios.api'
import { getLayoutWithNav } from '@/widgets'

export const getStaticProps = async () => {
  const data = await API.profileAPI.getProfile()

  console.log(data)

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      data,
    },
  }
}

type Props = {
  data: IProfileResponse
}

function Profile({ data }: Props) {
  return <div>123</div>
}

Profile.getLayout = getLayoutWithNav
export default Profile
