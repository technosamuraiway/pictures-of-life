import React, { useState } from 'react'

import { User } from '@/services/graphql/codegen/graphql'
import { useRouterLocaleDefinition } from '@/shared'
import { Button, Modal, Select, Typography } from '@technosamurai/techno-ui-kit'
import { BUN_REASON_TYPE } from 'src/shared/enums'

import s from './BanUnbanUserModal.module.scss'

interface IProps {
  headerTitle: string
  isOpenModal: boolean
  onClickNegativeButton?: () => void
  onClickPositiveButton: (banReason: BUN_REASON_TYPE) => void
  setIsOpenModal: (isOpenModal: boolean) => void
  textContent: string
  user: User
}

export function BanUnbanUserModal({
  headerTitle,
  isOpenModal,
  onClickNegativeButton,
  onClickPositiveButton,
  setIsOpenModal,
  textContent,
  user,
}: IProps) {
  const t = useRouterLocaleDefinition()
  const [banReason, setBanReason] = useState<BUN_REASON_TYPE>(BUN_REASON_TYPE.BAD_BEHAVIOR)

  return (
    <>
      <Modal
        closeButtonClassName={s.closeButton}
        headerTitle={headerTitle}
        onOpenChange={setIsOpenModal}
        open={isOpenModal}
      >
        <div className={s.childrenWrapper}>
          <Typography variant={'regular-text-16'}>
            {textContent}&nbsp;
            {user.userName}&nbsp;?
          </Typography>
          {!user.userBan && (
            <Select
              contentStyle={s.contentStyle}
              currentValue={banReason}
              defaultValue={BUN_REASON_TYPE.BAD_BEHAVIOR}
              onValueChange={el => {
                setBanReason(el as BUN_REASON_TYPE)
              }}
              options={[
                {
                  label: t.admin.usersList.badBehavior,
                  value: BUN_REASON_TYPE.BAD_BEHAVIOR,
                },
                {
                  label: t.admin.usersList.advertisingPlacement,
                  value: BUN_REASON_TYPE.ADVERTISING_PLACEMENT,
                },
                {
                  label: t.admin.usersList.anotherReason,
                  value: BUN_REASON_TYPE.ANOTHER_REASON,
                },
              ]}
              selectWidth={'250px'}
            />
          )}
          <div className={s.buttonsWrapper}>
            <Button
              className={s.modalButton}
              onClick={() => onClickPositiveButton(banReason)}
              type={'button'}
              variant={'outline'}
            >
              {t.logOut.buttonYes}
            </Button>
            <Button className={s.modalButton} onClick={onClickNegativeButton} type={'button'}>
              {t.logOut.buttonNo}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
