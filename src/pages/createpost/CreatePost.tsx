import { MetaHead, useRouterLocaleDefinition } from '@/shared'
import { getLayoutWithNav } from '@/widgets'

const CreatePost = () => {
  const t = useRouterLocaleDefinition()

  // Comment

  return (
    <>
      <MetaHead title={t.createNewPost.title} />
      {/*<CreateNewPostModal />*/}
    </>
  )
}

CreatePost.getLayout = getLayoutWithNav
export default CreatePost
