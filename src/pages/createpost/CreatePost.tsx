import { useState } from 'react'

import { CreateNewPostModal } from '@/entities'
import { MetaHead, useRouterLocaleDefinition } from '@/shared'
import { getLayoutWithNav } from '@/widgets'

const CreatePost = () => {
  const t = useRouterLocaleDefinition()
  const [openPostModal, setOpenPostModal] = useState<boolean>(true)

  return (
    <>
      <MetaHead title={t.createNewPost.title} />
      <CreateNewPostModal onOpenModal={setOpenPostModal} openModal={openPostModal} />
    </>
  )
}

CreatePost.getLayout = getLayoutWithNav
export default CreatePost
