import { getLayoutWithNav } from '@/containers'
import { CreateNewPostModal } from '@/entities'
import { MetaHead, useRouterLocaleDefinition } from '@/shared'

const CreatePost = () => {
  const t = useRouterLocaleDefinition()

  return (
    <>
      <MetaHead title={t.createNewPost.title} />
      <CreateNewPostModal />
    </>
  )
}

CreatePost.getLayout = getLayoutWithNav
export default CreatePost
