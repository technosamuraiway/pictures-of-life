import { Dispatch, SetStateAction, useState } from 'react'
import { toast } from 'react-toastify'

import {
  useCreatePostMutation,
  useGetProfileQuery,
  useUploadImagesForPostMutation,
} from '@/services'
import { PATH, RequestLineLoader, useRouterLocaleDefinition } from '@/shared'
import { getImagesFromDB, saveImagesToDB } from '@/shared/utils/saveImagesToDB'
import { useRouter } from 'next/router'

import { PostWithoutHeaderModal } from '../../postWithoutHeaderModal/PostWithoutHeaderModal'
import { BeforePublication } from './beforePublication/BeforePublication'
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
  const [postDescription, setPostDescription] = useState<string>('')

  const t = useRouterLocaleDefinition()
  const { replace } = useRouter()

  const [uploadImagesForPost, { data: uploadImagesResult, isLoading: isCreateImagePostLoading }] =
    useUploadImagesForPostMutation()
  const [createPost, { isLoading: isCreatePostLoading }] = useCreatePostMutation()
  const { data: profileData } = useGetProfileQuery()
  const { processAllImages } = useGetFilesList(downloadedImage, imageStates)

  // Updated onNextButtonClickHandler to save images to IndexedDB
  const onNextButtonClickHandler = async () => {
    if (editFilter) {
      const processedImages = await processAllImages()

      // Save the processed images to IndexedDB before uploading
      try {
        const imagesToSave = processedImages.map((file, index) => ({
          dataUrl: URL.createObjectURL(file), // You can adjust how you store images here
          id: `image-${index}`, // Generate unique ID for each image
        }))

        await saveImagesToDB(imagesToSave)

        toast.success('Images saved to draft (IndexedDB) successfully!')
      } catch (error) {
        console.error('Failed to save images to IndexedDB:', error)
        toast.error('Failed to save images to draft.')
      }

      await uploadImagesForPost({ files: processedImages }).unwrap()

      toast.success(t.createNewPost.editPhotoModal.createPost.uploadSuccess)
      setEditFilter(false)
      setAddTextView(true)
    } else if (addTextView) {
      if (uploadImagesResult) {
        await createPost({
          description: postDescription,
          uploadIds: uploadImagesResult.images.map(img => {
            return img.uploadId
          }),
        }).unwrap()

        replace(`${PATH.PROFILE.BASEPROFILE}/${profileData?.id}`)
        toast.success(t.createNewPost.editPhotoModal.createPost.createPostSuccess)
      }
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

  const headerTitleText = (() => {
    if (editFilter) {
      return t.createNewPost.editPhotoModal.modalFiltersTitle
    } else if (addTextView) {
      return t.createNewPost.editPhotoModal.createPost.modalPublicationTitle
    } else {
      return t.createNewPost.editPhotoModal.modalTitle
    }
  })()

  return (
    <>
      {(isCreateImagePostLoading || isCreatePostLoading) && <RequestLineLoader />}
      <PostWithoutHeaderModal
        addTextView={addTextView}
        editFilter={editFilter}
        headerTitle={headerTitleText}
        isDisabled={isCreatePostLoading || isCreateImagePostLoading}
        nextBtnTitle={
          addTextView
            ? t.createNewPost.editPhotoModal.createPost.publishBtn
            : t.createNewPost.editPhotoModal.nextBtn
        }
        onBackButtonClick={onBackButtonClickHandler}
        onNextButtonClick={onNextButtonClickHandler}
        onOpen={onOpen}
        setOnOpen={setOnOpen}
      >
        {addTextView ? (
          <BeforePublication
            postDescription={postDescription}
            setPostDescription={setPostDescription}
            uploadImagesResult={uploadImagesResult}
          />
        ) : (
          <ImageEditor
            downloadedImage={downloadedImage}
            editFilter={editFilter}
            imageStates={imageStates}
            isDisabled={isCreateImagePostLoading}
            setDownloadedImage={setDownloadedImage}
            setImageStates={setImageStates}
          />
        )}
      </PostWithoutHeaderModal>
    </>
  )
}
