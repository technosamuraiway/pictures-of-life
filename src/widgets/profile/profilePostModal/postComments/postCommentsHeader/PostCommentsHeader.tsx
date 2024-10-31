import { memo } from 'react'

import { useCloseProfilePostModalWithRouter } from '../../../lib/hooks/useCloseProfilePostModalWithRouter'

interface IProps {
  rootCN?: string
}

export const PostCommentsHeader = memo(({ rootCN }: IProps) => {
  const { close, query } = useCloseProfilePostModalWithRouter()

  return <div className={rootCN}>123</div>
})
