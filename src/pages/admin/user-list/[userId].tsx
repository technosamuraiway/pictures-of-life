import { MetaHead, useRouterLocaleDefinition } from '@/shared'
import { AdminPanelUser, getBaseLayout } from '@/widgets'

const UserList = () => {
  const t = useRouterLocaleDefinition()

  return (
    <>
      <MetaHead title={t.admin.userList.title} />
      <AdminPanelUser />
    </>
  )
}

UserList.getLayout = getBaseLayout
export default UserList
