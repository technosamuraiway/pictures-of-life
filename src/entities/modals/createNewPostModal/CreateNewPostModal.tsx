import { useState } from 'react'

import { AddPostPhotoModal } from './addPostPhotoModal/AddPostPhotoModal'
import { EditPostPhotoModal } from './editPostPhotoModal/EditPostPhotoModal'

export const CreateNewPostModal = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false)

  const [downloadedImage, setDownloadedImage] = useState<(File | string)[]>([''])

  return (
    <>
      {isEdit ? (
        <EditPostPhotoModal
          downloadedImage={downloadedImage}
          onOpen={isEdit}
          setDownloadedImage={setDownloadedImage}
          setOnOpen={setIsEdit}
        />
      ) : (
        <AddPostPhotoModal onEditMode={setIsEdit} setImage={setDownloadedImage} />
      )}
    </>
  )
}
