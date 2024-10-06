import { Dispatch, SetStateAction, useState } from 'react'

import { useRouterLocaleDefinition } from '@/shared'

import { PostWithoutHeaderModal } from '../../postWithoutHeaderModal/PostWithoutHeaderModal'
import { ImageEditor } from './imageEditor/ImageEditor'

interface IProps {
  downloadedImage: string[]
  onOpen: boolean
  setDownloadedImage: Dispatch<SetStateAction<string[]>>
  setOnOpen: (onOpen: boolean) => void
}

export const EditPostPhotoModal = ({
  downloadedImage,
  onOpen,
  setDownloadedImage,
  setOnOpen,
}: IProps) => {
  const [editFilter, setEditFilter] = useState<boolean>(false)
  const t = useRouterLocaleDefinition()

  const onNextButtonClickHandler = () => {
    if (editFilter) {
    } else {
      setEditFilter(true)
    }
  }

  const onBackButtonClickHandler = () => {
    if (editFilter) {
      setEditFilter(false)
      setOnOpen(true)
    } else {
      setDownloadedImage([])
      setOnOpen(false)
    }
  }

  const onCropCompleteHandler = (croppedImages: string[]) => {
    // Здесь вы можете отправить обрезанные изображения на сервер или
    // выполнить другие действия с ними
  }

  return (
    <PostWithoutHeaderModal
      editFilter={editFilter}
      headerTitle={
        editFilter
          ? t.createNewPost.editPhotoModal.modalFiltersTitle
          : t.createNewPost.editPhotoModal.modalTitle
      }
      nextBtnTitle={t.createNewPost.editPhotoModal.nextBtn}
      onBackButtonClick={onBackButtonClickHandler}
      onNextButtonClick={onNextButtonClickHandler}
      onOpen={onOpen}
      setOnOpen={setOnOpen}
    >
      <ImageEditor
        downloadedImage={downloadedImage}
        editFilter={editFilter}
        onComplete={onCropCompleteHandler}
        setDownloadedImage={setDownloadedImage}
      />
    </PostWithoutHeaderModal>
  )
}
