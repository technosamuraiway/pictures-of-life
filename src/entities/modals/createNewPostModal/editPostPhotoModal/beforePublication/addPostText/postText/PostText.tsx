import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'

import { useGetProfileQuery } from '@/services'
import { RoundAvatar, useRouterLocaleDefinition } from '@/shared'
import { TextArea, Typography } from '@technosamurai/techno-ui-kit'

import s from './PostText.module.scss'

const MAX_CHARS = 500

interface IProps {
  postDescription: string
  setPostDescription: Dispatch<SetStateAction<string>>
}

export const PostText = ({ postDescription, setPostDescription }: IProps) => {
  const { data: profileData } = useGetProfileQuery()

  const t = useRouterLocaleDefinition()

  const [charCount, setCharCount] = useState<number>(0)

  const onTextAreaCharChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const usedChars = event.target.value.length

    setPostDescription(event.target.value)
    setCharCount(usedChars)
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
        <TextArea
          className={s.textArea}
          errorText={t.createNewPost.editPhotoModal.createPost.textAreaCharLimit}
          errorTextCN={s.errorText}
          isError={charCount >= MAX_CHARS}
          maxLength={MAX_CHARS}
          onChange={onTextAreaCharChangeHandler}
          placeholder={t.createNewPost.editPhotoModal.createPost.textAreaPlaceHolder}
          textAreaLabelText={t.createNewPost.editPhotoModal.createPost.textAreaLabel}
          value={postDescription}
          wrapperCN={s.wrapper}
        />

        <Typography className={s.charCount} variant={'regular-text-14'}>
          {`${MAX_CHARS - charCount}/${MAX_CHARS}`}
        </Typography>
      </div>
    </div>
  )
}
