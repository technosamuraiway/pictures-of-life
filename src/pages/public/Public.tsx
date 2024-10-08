import { getLayout } from "@/containers";
import Posts from '@/entities/publicPosts/posts'
import { MetaHead } from '@/shared'
function Public() {
  return (
    <>
      <MetaHead title={'Public page'} />
      <Posts />
    </>
  )
}

Public.getLayout = getLayout
export default Public
