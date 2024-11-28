import { useRouterLocaleDefinition } from '@/shared'
import { useRouter } from 'next/router'

import s from './AdminPanelUser.module.scss'

import { AdminUserTabs } from './adminUserTabs/AdminUserTabs'
import { AvatarInfo } from './avatarInfo/AvatarInfo'
import { BackToUsersList } from './backToUsersList/BackToUsersList'
import { UserInfo } from './userInfo/UserInfo'

export const AdminPanelUser = () => {
  const t = useRouterLocaleDefinition()
  const { query } = useRouter()

  return (
    <div className={s.wrapper}>
      <BackToUsersList />
      <AvatarInfo />
      <div className={s.textWrapper}>
        <UserInfo header={t.admin.userList.userID} info={'142315'} />
        <UserInfo header={t.admin.userList.profileCreationDate} info={'asd'} />
      </div>
      <AdminUserTabs />
    </div>
  )
}
