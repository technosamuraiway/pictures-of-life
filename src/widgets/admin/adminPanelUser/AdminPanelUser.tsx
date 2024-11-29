import { GET_USER } from '@/services/graphql/queries/user'
import { convertDate, useGetUserIdFromParams, useRouterLocaleDefinition } from '@/shared'
import { useQuery } from '@apollo/client'

import s from './AdminPanelUser.module.scss'

import { AdminUserTabs } from './adminUserTabs/AdminUserTabs'
import { AvatarInfo } from './avatarInfo/AvatarInfo'
import { BackToUsersList } from './backToUsersList/BackToUsersList'
import { UserInfo } from './userInfo/UserInfo'

export const AdminPanelUser = () => {
  const t = useRouterLocaleDefinition()

  const { userId } = useGetUserIdFromParams()

  const { data: getUserData } = useQuery(GET_USER, {
    variables: {
      userId: Number(userId),
    },
  })

  return (
    <div className={s.wrapper}>
      <BackToUsersList />
      <AvatarInfo />
      <div className={s.textWrapper}>
        <UserInfo header={t.admin.userList.userID} info={String(getUserData?.getUser.id) || ''} />
        <UserInfo
          header={t.admin.userList.profileCreationDate}
          info={convertDate(getUserData?.getUser.createdAt)}
        />
      </div>
      <AdminUserTabs />
    </div>
  )
}
