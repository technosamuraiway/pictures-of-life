import { IProfileResponse } from '@/services'
import { getLayoutWithNav } from '@/widgets'

type Props = {
  data: IProfileResponse
}

function Profile({ data }: Props) {
  return <div>123</div>
}

Profile.getLayout = getLayoutWithNav
export default Profile
