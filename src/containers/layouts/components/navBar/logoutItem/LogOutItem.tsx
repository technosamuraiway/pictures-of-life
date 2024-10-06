import { ActionConfirmationModal } from '@/entities'
import { AdaptiveTranslation, useRouterLocaleDefinition } from '@/shared'
import { Button, LogOutIcon, Typography } from '@technosamurai/techno-ui-kit'

import s from './LogOutItem.module.scss'

interface IProps {
  email?: string
  isDisableButtons?: boolean
  isOpenModal: boolean
  onClickLogOutBtn: () => void
  onClickModalPositiveButton: () => void
  setOpenModal: (openModal: boolean) => void
}

export const LogOutItem = ({
  email,
  isDisableButtons,
  isOpenModal,
  onClickLogOutBtn,
  onClickModalPositiveButton,
  setOpenModal,
}: IProps) => {
  const t = useRouterLocaleDefinition()

  return (
    <>
      <Button className={s.logOutButton} onClick={onClickLogOutBtn} variant={'iconButton'}>
        <LogOutIcon className={s.logOutIcon} />
        <Typography variant={'medium-text-14'}>{t.logOut.logOutButton}</Typography>
      </Button>
      <ActionConfirmationModal
        headerTitle={t.logOut.logOutModalHeader}
        isDisableButtons={isDisableButtons}
        isOpenModal={isOpenModal}
        modalTextChildren={
          <AdaptiveTranslation
            tags={{
              1: () => (
                <Typography as={'span'} className={s.email}>
                  {email}
                </Typography>
              ),
            }}
            text={t.logOut.logOutText}
          />
        }
        negativeButtonChildren={t.logOut.buttonNo}
        onClickPositiveButton={onClickModalPositiveButton}
        positiveButtonChildren={t.logOut.buttonYes}
        setIsOpenModal={setOpenModal}
      />
    </>
  )
}
