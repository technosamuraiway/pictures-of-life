import { MetaHead, useRouterLocaleDefinition } from '@/shared'
import { AdminPosts, getLayoutWithNav } from '@/widgets'

const AdminPostsList = () => {
  const t = useRouterLocaleDefinition()

  return (
    <>
      <MetaHead title={t.admin.postsList.title} />
      <AdminPosts />
    </>
  )
}

AdminPostsList.getLayout = getLayoutWithNav
export default AdminPostsList
