import AvatarEditorComponent from '@/pages/avatar/avatareditor'
import { AdaptiveTranslation, useRouterLocaleDefinition } from '@/shared'
import emptyAvatar from '@public/profileAvatar/emptyAvatar.svg'
import { Button, Modal, Typography } from '@technosamurai/techno-ui-kit'
import Image from 'next/image'

import s from './AddProfilePhotoModal.module.scss'

interface IProps {
  onOpenModal: (open: boolean) => void
  openModal: boolean
}

export const AddProfilePhotoModal = ({ onOpenModal, openModal }: IProps) => {
  const t = useRouterLocaleDefinition()

  const errorType = true
  const modalErrorText = errorType ? t.avatarChange.errorFormatText : t.avatarChange.errorSizeText

  return (
    <Modal
      headerTitle={t.avatarChange.addAvatarModalHeader}
      modalSize={'M'}
      onOpenChange={onOpenModal}
      open={openModal}
    >
      <AvatarEditorComponent />
      {/*<div className={s.addAvatarModalWrapper}>*/}
      {/*  <div className={s.errorWrapper}>*/}
      {/*    <Typography variant={'regular-text-14'}>*/}
      {/*      <AdaptiveTranslation*/}
      {/*        tags={{*/}
      {/*          1: () => (*/}
      {/*            <Typography as={'span'} className={s.errorText} variant={'bold-text-14'}>*/}
      {/*              {t.avatarChange.errorText}*/}
      {/*            </Typography>*/}
      {/*          ),*/}
      {/*        }}*/}
      {/*        text={modalErrorText}*/}
      {/*      />*/}
      {/*    </Typography>*/}
      {/*  </div>*/}
      {/*  <div className={s.addAvatarImgWrapper}>*/}
      {/*    <Image alt={t.avatarChange.avatarImgAltText} className={s.avatarImg} src={emptyAvatar} />*/}
      {/*  </div>*/}
      {/*  <Button className={s.addAvatarButton} variant={'primary'}>*/}
      {/*    {t.avatarChange.addAvatarModalButtonText}*/}
      {/*  </Button>*/}
      {/*</div>*/}
    </Modal>
  )
}
