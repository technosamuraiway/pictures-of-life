import { Dispatch, SetStateAction } from 'react'

import { TimeAgo, useRouterLocaleDefinition } from '@/shared'
import { Typography } from '@technosamurai/techno-ui-kit'

import s from './AdminDescriptionPost.module.scss'

interface IProps {
  createdAt: null | string
  description: null | string
  expandedPosts: Record<string, boolean>
  id: null | number
  setExpandedPosts: Dispatch<SetStateAction<Record<string, boolean>>>
}

export const AdminDescriptionPost = ({
  createdAt,
  description,
  expandedPosts,
  id,
  setExpandedPosts,
}: IProps) => {
  const t = useRouterLocaleDefinition()

  const toggleTextHandler = () => {
    if (id) {
      const postIdString = id.toString()

      setExpandedPosts(prev => ({
        ...prev,
        [postIdString]: !prev[postIdString],
      }))
    }
  }

  return (
    <>
      <Typography className={s.createdAt} variant={'small-text'}>
        {TimeAgo(createdAt || '', t)}
      </Typography>
      <>
        <Typography
          className={expandedPosts[id || 0] ? s.fullText : s.descText}
          variant={'regular-text-14'}
        >
          {description}
        </Typography>
        {description && description?.length > 100 && (
          <Typography
            className={s.showMoreButton}
            onClick={toggleTextHandler}
            variant={'small-text'}
          >
            {expandedPosts[id || 0] ? t.postText.hide : t.postText.show}
          </Typography>
        )}
      </>
    </>
  )
}
