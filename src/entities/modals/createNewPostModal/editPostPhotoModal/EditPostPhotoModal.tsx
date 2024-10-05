import { useRouterLocaleDefinition } from '@/shared'

import { PostWithoutHeaderModal } from '../../postWithoutHeaderModal/PostWithoutHeaderModal'
import { ImageEditor } from './imageEditor/ImageEditor'

interface IProps {
  downloadedImage: string[]
  onOpen: boolean
  setDownloadedImage: (images: string[]) => void
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

  const onCropCompleteHandler = (croppedImages: string[]) => {
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
        onCropComplete={onCropCompleteHandler}
        setDownloadedImage={setDownloadedImage}
      />
    </PostWithoutHeaderModal>
  )
}
