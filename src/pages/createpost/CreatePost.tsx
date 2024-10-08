import { CreateNewPostModal } from '@/entities'
import { MetaHead, useRouterLocaleDefinition } from '@/shared'
import { getLayoutWithNav } from '@/widgets'

const CreatePost = () => {
  const t = useRouterLocaleDefinition()

  // comment
  return (
    <>
      <MetaHead title={t.createNewPost.title} />
      <CreateNewPostModal />
    </>
  )
}

CreatePost.getLayout = getLayoutWithNav
export default CreatePost
