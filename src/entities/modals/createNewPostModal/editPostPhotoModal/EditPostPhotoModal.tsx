import { Dispatch, SetStateAction, useState } from 'react'

import { useCreateImagePostMutation } from '@/services'
import { useRouterLocaleDefinition } from '@/shared'

import { PostWithoutHeaderModal } from '../../postWithoutHeaderModal/PostWithoutHeaderModal'
import { ImageEditor } from './imageEditor/ImageEditor'
import { ImageState } from './imageEditor/utils/types'
import { getCroppedImg } from './imageEditor/utils/utils'

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
  const [imageStates, setImageStates] = useState<ImageState[]>([])
  const t = useRouterLocaleDefinition()

  const [createImagePost, { isLoading: isCreateImagePostLoading }] = useCreateImagePostMutation()

  const processAllImages = async () => {
    const processedImages = await Promise.all(
      imageStates.map(async (state, index) => {
        if (state.croppedAreaPixels) {
          return await getCroppedImg(
            downloadedImage[index],
            state.croppedAreaPixels,
            0,
            state.filter
          )
        }

        return null
      })
    )

    // Фильтруем null значения (если были ошибки при обработке)
    return processedImages.filter((img): img is string => img !== null)
  }

  const onNextButtonClickHandler = async () => {
    if (editFilter) {
      setEditFilter(false)
      setAddTextView(true)
    } else if (addTextView) {
      const processedImages = await processAllImages()

      await createImagePost({ images: processedImages })
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
        imageStates={imageStates}
        onComplete={onCropCompleteHandler}
        setDownloadedImage={setDownloadedImage}
        setImageStates={setImageStates}
      />
    </PostWithoutHeaderModal>
  )
}
