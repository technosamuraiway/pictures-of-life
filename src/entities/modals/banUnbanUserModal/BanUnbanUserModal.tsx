import React from 'react'

import { User, UserBlockStatus } from '@/services/graphql/codegen/graphql'
import { useRouterLocaleDefinition } from '@/shared'
import { Button, Modal, Select, Typography } from '@technosamurai/techno-ui-kit'

import s from './BanUnbanUserModal.module.scss'

interface IProps {
  headerTitle: string
  isOpenModal: boolean
  onClickNegativeButton?: () => void
  onClickPositiveButton: () => void
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
              containerStyle={{ zIndex: '299' }}
              contentStyle={{ zIndex: '299' }}
              currentValue={''}
              defaultValue={'Reason for ban'}
              onValueChange={
                () => {}
                // el => {
                //   setFilterByUserStatus(el as UserBlockStatus)
                //   refetch()
                // }
              }
              options={[
                {
                  label: 'Bad behavior',
                  value: 'Bad behavior',
                },
                {
                  label: 'Advertising placement',
                  value: 'Advertising placement',
                },
                {
                  label: 'Another reason',
                  value: 'Another reason',
                },
              ]}
              selectWidth={'250px'}
            />
          )}
          <div className={s.buttonsWrapper}>
            <Button
              className={s.modalButton}
              onClick={onClickPositiveButton}
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
