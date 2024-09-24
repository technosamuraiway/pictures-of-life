import { ActionConfirmationModal } from '@/entities'
import { AdaptiveTranslation, useRouterLocaleDefinition } from '@/shared'
import { Button, LogOutIcon, Typography } from '@technosamurai/techno-ui-kit'

import s from './LogOutItem.module.scss'

interface IProps {
  isDisableButtons?: boolean
  isOpenModal: boolean
  onClickLogOutBtn: () => void
  onClickModalPositiveButton: () => void
  setOpenModal: (openModal: boolean) => void
  userName?: string
}

export const LogOutItem = ({
  isDisableButtons,
  isOpenModal,
  onClickLogOutBtn,
  onClickModalPositiveButton,
  setOpenModal,
  userName = 'Best User',
}: IProps) => {
  const t = useRouterLocaleDefinition()

  return (
    <>
      <Button className={s.logOutButton} onClick={onClickLogOutBtn} variant={'iconButton'}>
        <span className={s.logOutIcon}>
          <LogOutIcon />
        </span>
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
                <Typography as={'span'} className={s.userName}>
                  {userName}
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
