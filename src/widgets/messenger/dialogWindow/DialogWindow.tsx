import { useState } from 'react'

import { useGetPublicUserProfileByIdQuery } from '@/services/flow/publicUser.service'
import { RequestLineLoader, useUserIdFromParams } from '@/shared'

import s from './DialogWindow.module.scss'

import { ChatField } from './chatField/ChatField'
import { HeaderUser } from './headerUser/HeaderUser'
import { INITIAL_TEXT_FIELD_HEIGHT } from './lib/variables'
import { TextAreaField } from './textAreaField/TextAreaField'

export const DialogWindow = () => {
  const { userId } = useUserIdFromParams()
  const [textAreaHeight, setTextAreaHeight] = useState(INITIAL_TEXT_FIELD_HEIGHT)

  const { data: getPublicUserProfile, isLoading: getPublicUserProfileIsLoading } =
    useGetPublicUserProfileByIdQuery(String(userId), {
      skip: !userId,
    })

  const changeTextAreaHeightHandler = (height: number) => {
    setTextAreaHeight(height)
  }

  return (
    <>
      {getPublicUserProfileIsLoading && <RequestLineLoader />}
      <div className={s.wrapper}>
        <HeaderUser
          avatar={getPublicUserProfile?.avatars[0]?.url}
          userName={getPublicUserProfile?.userName}
        />
        <ChatField avatar={getPublicUserProfile?.avatars[0]?.url} textAreaHeight={textAreaHeight} />
        <TextAreaField onHeightChange={changeTextAreaHeightHandler} />
      </div>
    </>
  )
}
