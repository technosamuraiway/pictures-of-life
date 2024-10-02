import { ActionConfirmationModal } from '@/entities'
import { useRouterLocaleDefinition } from '@/shared'
import { ResetIcon } from '@public/createPost/ResetIcon'
import clsx from 'clsx'

import s from './ConfirmReset.module.scss'

interface IProps {
  openResetModal: boolean
  resetImageSettings: () => void
  setOpenResetModal: (openResetModal: boolean) => void
}

export const ConfirmReset = ({ openResetModal, resetImageSettings, setOpenResetModal }: IProps) => {
  const t = useRouterLocaleDefinition()

  return (
    <>
      <button className={s.triggerButton} onClick={() => setOpenResetModal(true)} type={'button'}>
        <ResetIcon className={clsx(s.resetIcon, openResetModal && s.activeResetIcon)} />
      </button>
      <ActionConfirmationModal
        buttonsWrapperCN={s.modalButtons}
        headerTitle={t.createNewPost.editPhotoModal.resetSettings.headerTitle}
        isOpenModal={openResetModal}
        modalTextChildren={t.createNewPost.editPhotoModal.resetSettings.mainText}
        negativeButtonChildren={t.createNewPost.editPhotoModal.resetSettings.negativeResult}
        onClickPositiveButton={resetImageSettings}
        positiveButtonChildren={t.createNewPost.editPhotoModal.resetSettings.positiveResult}
        setIsOpenModal={setOpenResetModal}
      />
    </>
  )
}
