import { useRouterLocaleDefinition } from '@/shared'

import { PostWithoutHeaderModal } from '../../postWithoutHeaderModal/PostWithoutHeaderModal'
import { ImageEditor } from './imageEditor/ImageEditor'

interface IProps {
  downloadedImage: (File | string)[]
  onOpen: boolean
  setDownloadedImage: (
    images: (File | string)[] | ((prevImages: (File | string)[]) => (File | string)[])
  ) => void
  setOnOpen: (onOpen: boolean) => void
}

export const EditPostPhotoModal = ({
  downloadedImage,
  onOpen,
  setDownloadedImage,
  setOnOpen,
}: IProps) => {
  const t = useRouterLocaleDefinition()

  const onNextButtonClickHandler = () => {}

  const onBackButtonClickHandler = () => {
    setOnOpen(false)
  }

  const handleCropComplete = (croppedImages: string[]) => {
    console.log('All images cropped:', croppedImages)
    // Здесь вы можете отправить обрезанные изображения на сервер или
    // выполнить другие действия с ними
  }

  return (
    <PostWithoutHeaderModal
      headerTitle={t.createNewPost.editPhotoModal.modalTitle}
      nextBtnTitle={t.createNewPost.editPhotoModal.nextBtn}
      onBackButtonClick={onBackButtonClickHandler}
      onNextButtonClick={onNextButtonClickHandler}
      onOpen={onOpen}
      setOnOpen={setOnOpen}
    >
      <ImageEditor
        downloadedImage={downloadedImage}
        onCropCompleteProps={handleCropComplete}
        setDownloadedImage={setDownloadedImage}
      />
    </PostWithoutHeaderModal>
  )
}
