import { ChangeEvent, useState } from 'react'

import { useGetProfileQuery } from '@/services'
import { RoundAvatar, useRouterLocaleDefinition } from '@/shared'
import { TextArea, Typography } from '@technosamurai/techno-ui-kit'

import s from './PostText.module.scss'
const MAX_CHARS = 500

export const PostText = () => {
  const { data: profileData } = useGetProfileQuery()

  const t = useRouterLocaleDefinition()

  const [charCount, setCharCount] = useState<number>(0)

  const onTextAreaCharChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const remainingChars = MAX_CHARS - event.target.value.length

    setCharCount(remainingChars)
  }

  return (
    <div className={s.postWrapper}>
      <div className={s.avatarWrapper}>
        <RoundAvatar
          avatarCN={s.avatar}
          avatarWrapperCN={s.avatar}
          imgCN={s.avatar}
          isShowAddBtn={false}
          isShowDeleteBtn={false}
        />
        <Typography variant={'regular-text-16'}>{profileData?.userName}</Typography>
      </div>
      <div className={s.textAreaWrapper}>
        <Typography className={s.textAreaLabel} variant={'regular-text-14'}>
          {t.createNewPost.editPhotoModal.textAreaLabel}
        </Typography>

        <TextArea
          className={s.textArea}
          errorText={t.createNewPost.editPhotoModal.textAreaCharLimit}
          isError={charCount === MAX_CHARS}
          maxLength={MAX_CHARS}
          onChange={onTextAreaCharChangeHandler}
          placeholder={t.createNewPost.editPhotoModal.textAreaPlaceHolder}
        />

        <Typography className={s.charCount} variant={'regular-text-14'}>
          {`${charCount}/${MAX_CHARS}`}
        </Typography>
      </div>
    </div>
  )
}
