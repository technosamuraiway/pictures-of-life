import { useState } from 'react'

import { useRouterLocaleDefinition } from '@/shared'
import testImg from '@public/mockAvatar.png'
import { Typography } from '@technosamurai/techno-ui-kit'
import Image from 'next/image'

import s from './AllComments.module.scss'

const commentsCount = 1000

interface IProps {}

export const AllComments = ({}: IProps) => {
  const t = useRouterLocaleDefinition()
  const [openComments, setOpenComments] = useState(false)

  return (
    <div>
      <div className={s.header} onClick={() => setOpenComments(!openComments)}>
        {openComments ? (
          <Typography className={s.text} variant={'bold-text-14'}>
            {t.profile.modal.hideAllComments} ({commentsCount})
          </Typography>
        ) : (
          <Typography className={s.text} variant={'bold-text-14'}>
            {t.profile.modal.showAllComments} ({commentsCount})
          </Typography>
        )}
      </div>
      {openComments && <Image alt={`test 1`} height={240} priority src={testImg.src} width={240} />}
    </div>
  )
}
