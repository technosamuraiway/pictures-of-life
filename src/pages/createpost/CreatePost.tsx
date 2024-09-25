import { useState } from 'react'

import { CreateNewPostModal } from '@/entities'
import { MetaHead, useRouterLocaleDefinition } from '@/shared'
import { getLayoutWithNav } from '@/widgets'

const CreatePost = () => {
  const t = useRouterLocaleDefinition()
  const [openAddPost, setOpenAddPost] = useState<boolean>(true)

  const [isEdit, setIsEdit] = useState<boolean>(false)

  // const modalHandler = () => {
  //   if (openModal) {
  //     setOpenExitModal(true)
  //     //   Добавить логику сохранить или нет
  //   } else {
  //     onOpenModal(true)
  //   }
  // }

  return (
    <>
      <MetaHead title={t.createNewPost.title} />
      <CreateNewPostModal
        onEditMode={setIsEdit}
        onOpenModal={setOpenAddPost}
        openModal={openAddPost}
      />
    </>
  )
}

CreatePost.getLayout = getLayoutWithNav
export default CreatePost
