import Posts from "@/entities/publicPosts/posts";
import { MetaHead } from "@/shared";
import { getBaseLayout } from "@/widgets";


function Public() {
  return (
    <>
      <MetaHead title={'Public page'} />
      <Posts />
    </>
  )
}

Public.getLayout = getBaseLayout
export default Public
