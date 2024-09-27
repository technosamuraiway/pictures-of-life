import { useState } from 'react'

import { AddPostPhotoModal } from './addPostPhotoModal/AddPostPhotoModal'
import { EditPostPhotoModal } from './editPostPhotoModal/EditPostPhotoModal'

export const CreateNewPostModal = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false)

  const [image, setImage] = useState<(File | string)[]>([''])

  return (
    <>
      {isEdit ? (
        <EditPostPhotoModal image={image} onOpen={isEdit} setOnOpen={setIsEdit} />
      ) : (
        <AddPostPhotoModal onEditMode={setIsEdit} setImage={setImage} />
      )}
    </>
  )
}
