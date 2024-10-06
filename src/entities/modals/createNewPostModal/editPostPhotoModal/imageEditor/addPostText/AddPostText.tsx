import { useGetProfileQuery } from '@/services'
import { RoundAvatar, useRouterLocaleDefinition } from '@/shared'
import { TextArea, Typography } from '@technosamurai/techno-ui-kit'

import s from './AddPostText.module.scss'

import { PostLocations } from './postLocations/PostLocations'

export const AddPostText = () => {
  const { data: profileData } = useGetProfileQuery()

  const t = useRouterLocaleDefinition()

  return (
    <div className={s.addPostTextWrapper}>
      <div className={s.postWrapper}>
        <div className={s.avatarWrapper}>
          <RoundAvatar
            avatarCN={s.avatar}
            avatarWrapperCN={s.avatar}
            imgCN={s.avatar}
            isShowAddBtn={false}
            isShowDeleteBtn={false}
          />
          <Typography className={s.userName} variant={'regular-text-16'}>
            {profileData?.userName}
          </Typography>
        </div>
        <div className={s.textAreaWrapper}>
          <Typography className={s.textAreaLabel} variant={'regular-text-14'}>
            {t.createNewPost.editPhotoModal.textAreaLabel}
          </Typography>
          <TextArea
            className={s.textArea}
            placeholder={t.createNewPost.editPhotoModal.textAreaPlaceHolder}
          />
        </div>
      </div>
      <PostLocations />
    </div>
  )
}
