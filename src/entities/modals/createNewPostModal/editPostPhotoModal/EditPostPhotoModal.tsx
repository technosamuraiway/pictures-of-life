import { Dispatch, SetStateAction, useState } from 'react'

import { useCreateImagePostMutation } from '@/services'
import { RequestLineLoader, useRouterLocaleDefinition } from '@/shared'

import { PostWithoutHeaderModal } from '../../postWithoutHeaderModal/PostWithoutHeaderModal'
import { ImageEditor } from './imageEditor/ImageEditor'
import { ImageState } from './imageEditor/utils/types'
import { useGetFilesList } from './imageEditor/utils/useGetFilesList'

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
  const { processAllImages } = useGetFilesList(downloadedImage, imageStates)

  const onNextButtonClickHandler = async () => {
    if (editFilter) {
      const processedImages = await processAllImages()

      const result = await createImagePost({ files: processedImages })

      console.log(result)
      setEditFilter(false)
      setAddTextView(true)
    } else if (addTextView) {
      console.log('result')
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
    <>
      {isCreateImagePostLoading && <RequestLineLoader />}
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
        {addTextView ? (
          <div>View</div>
        ) : (
          <ImageEditor
            downloadedImage={downloadedImage}
            editFilter={editFilter}
            imageStates={imageStates}
            setDownloadedImage={setDownloadedImage}
            setImageStates={setImageStates}
          />
        )}
      </PostWithoutHeaderModal>
    </>
  )
}
