import { Dispatch, SetStateAction, useState } from 'react'
import { toast } from 'react-toastify'

import {
  PATH,
  SquareImg,
  checkIfImagesExistInDB,
  getImagesFromDB,
  useRouterLocaleDefinition,
} from '@/shared'
import { Modal } from '@technosamurai/techno-ui-kit'
import { useRouter } from 'next/router'

import s from './AddPostPhotoModal.module.scss'

import { PreviewImgScreen } from '../../../components/previewImgScreen/PreviewImgScreen'

interface IProps {
  onEditMode: (edit: boolean) => void
  setImage: Dispatch<SetStateAction<string[]>>
}

const MAX_FILE_SIZE = 20 * 1024 * 1024 // 20 МБ в байтах

export const AddPostPhotoModal = ({ onEditMode, setImage }: IProps) => {
  const t = useRouterLocaleDefinition()
  const { push } = useRouter()

  const [openAddPostPhoto, setOpenAddPostPhoto] = useState<boolean>(true)
  const [fileError, setFileError] = useState<null | string>(null)
  const [isDraftBtn, setIsDraftBtn] = useState<boolean>(false)

  const modalHandler = () => {
    openAddPostPhoto ? push(PATH.HOME) : setOpenAddPostPhoto(true)
  }

  async function checkImages() {
    const ifExistsImages = async function isImageExistsInDB() {
      return await checkIfImagesExistInDB()
    }

    const result = await ifExistsImages()

    setIsDraftBtn(result)
  }

  checkImages()

  const onDraftBtnClickHandler = async () => {
    async function fetchAndDisplayAllImages() {
      try {
        const images = await getImagesFromDB()

        if (Array.isArray(images)) {
          const newArray = images.map(el => {
            return el.dataUrl
          })

          setImage(newArray)
          onEditMode(true)
        }
      } catch (error) {
        toast.error('Ошибка при получении изображений:')
      }
    }

    // Вызов функции для получения и отображения всех изображений
    await fetchAndDisplayAllImages()
  }

  return (
    <Modal
      closeButtonClassName={s.closeButton}
      headerTitle={t.createNewPost.addPhotoModal.modalTitle}
      modalSize={'M'}
      onOpenChange={modalHandler}
      open={openAddPostPhoto}
    >
      <PreviewImgScreen
        addImgBtnText={t.createNewPost.addPhotoModal.addImgModalButtonText}
        errorSizeText={t.createNewPost.addPhotoModal.errorSizeText}
        errorText={fileError}
        maxImgSize={MAX_FILE_SIZE}
        multipleInput
        onDraftBtnClick={onDraftBtnClickHandler}
        onEditMode={onEditMode}
        openDraftBtnText={t.createNewPost.addPhotoModal.openDraftButtonText}
        setErrorText={setFileError}
        setImage={setImage}
        showDraftBtn={isDraftBtn}
      >
        <SquareImg imgSVGWrapperCN={s.imgWrapper} />
      </PreviewImgScreen>
    </Modal>
  )
}
