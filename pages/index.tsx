import { HeadMeta } from '../components/headMeta/HeadMeta'
import { getLayout } from '../components/layout/Layout'
import { useRouterLocaleDefinition } from '../hooks/useRouterLocaleDefinition'

const Home = () => {
  const routerLocale = useRouterLocaleDefinition()

  return (
    <>
      <HeadMeta title={routerLocale.title} />
      <h2>Hello, i am Home page</h2>
    </>
  )
}

Home.getLayout = getLayout
export default Home
