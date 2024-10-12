import { getLayoutWithNav } from '@/widgets'

export const getStaticProps = async () => {
  const res = await fetch('https://rickandmortyapi.com/api/character', { method: 'GET' })
  const data = await res.json()

  console.log(data)

  return {
    props: {
      data,
    },
  }
}

// type Props = {
//   data: IProfileResponse
// }

type Props = {
  data: any
}

function Profile({ data }: Props) {
  console.log(data)

  return <div>123</div>
}

Profile.getLayout = getLayoutWithNav
export default Profile
