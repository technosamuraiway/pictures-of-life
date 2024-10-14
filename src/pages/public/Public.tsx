
import Posts from '@/entities/publicPosts/posts'
import { MetaHead } from '@/shared'
import { getPublicLayout } from '@/widgets'



function Public() {
  return (
    <>
      <MetaHead title={'Public page'} />
      <Posts />
    </>
  )
}

Public.getLayout = getPublicLayout
export default Public
