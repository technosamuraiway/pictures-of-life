import { Dispatch, SetStateAction, useState } from 'react'
import { toast } from 'react-toastify'

import {
  useCreatePostMutation,
  useGetProfileQuery,
  useUploadImagesForPostMutation,
} from '@/services'
import { PATH, RequestLineLoader, useRouterLocaleDefinition } from '@/shared'
import { clearImagesFromDB } from '@/shared/utils/saveImagesToDB'
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

  const onNextButtonClickHandler = async () => {
    if (editFilter) {
      const processedImages = await processAllImages()

      await uploadImagesForPost({ files: processedImages }).unwrap()
      if (processedImages.length > 0) {
        toast.success(t.createNewPost.editPhotoModal.createPost.uploadSuccess)
        setEditFilter(false)
        setAddTextView(true)
      }
    } else if (addTextView) {
      if (uploadImagesResult) {
        await createPost({
          description: postDescription,
          uploadIds: uploadImagesResult.images.map(img => {
            return img.uploadId
          }),
        }).unwrap()

        try {
          await clearImagesFromDB()
        } catch (e) {
          toast.error('Error indexDB')
        }

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
        downloadedImage={downloadedImage}
        editFilter={editFilter}
        headerTitle={headerTitleText}
        isDisabled={isCreatePostLoading || isCreateImagePostLoading || downloadedImage.length <= 0}
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
