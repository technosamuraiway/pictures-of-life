import { useRouterLocaleDefinition } from '@/shared/hooks/useRouterLocaleDefinition'

export default function Home() {
  const routerLocale = useRouterLocaleDefinition()

  return (
    <>
      <div>{routerLocale.title}</div>
    </>
  )
}
