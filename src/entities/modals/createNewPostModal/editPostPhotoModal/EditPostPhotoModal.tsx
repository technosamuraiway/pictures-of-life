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
  const [addTextView, setAddTextView] = useState<boolean>(false)
  const t = useRouterLocaleDefinition()

  const onNextButtonClickHandler = () => {
    if (editFilter) {
      setEditFilter(false)
      setAddTextView(true)
    } else if (addTextView) {
    } else {
      setEditFilter(true)
    }
  }

  const onBackButtonClickHandler = () => {
    if (editFilter) {
      setEditFilter(false)
      setOnOpen(true)
    } else if (addTextView) {
      setEditFilter(true)
      setAddTextView(false)
    } else {
      setDownloadedImage([])
      setOnOpen(false)
    }
  }

  const onCropCompleteHandler = (croppedImages: string[]) => {
    // Здесь вы можете отправить обрезанные изображения на сервер или
    // выполнить другие действия с ними
  }

  const headerTitleText = (() => {
    if (editFilter) {
      return t.createNewPost.editPhotoModal.modalFiltersTitle
    } else if (addTextView) {
      return t.createNewPost.editPhotoModal.modalPublicationTitle
    } else {
      return t.createNewPost.editPhotoModal.modalTitle
    }
  })()

  return (
    <PostWithoutHeaderModal
      addTextView={addTextView}
      editFilter={editFilter}
      headerTitle={headerTitleText}
      nextBtnTitle={
        addTextView
          ? t.createNewPost.editPhotoModal.publishBtn
          : t.createNewPost.editPhotoModal.nextBtn
      }
      onBackButtonClick={onBackButtonClickHandler}
      onNextButtonClick={onNextButtonClickHandler}
      onOpen={onOpen}
      setOnOpen={setOnOpen}
    >
      <ImageEditor
        addTextView={addTextView}
        downloadedImage={downloadedImage}
        editFilter={editFilter}
        onComplete={onCropCompleteHandler}
        setDownloadedImage={setDownloadedImage}
      />
    </PostWithoutHeaderModal>
  )
}
