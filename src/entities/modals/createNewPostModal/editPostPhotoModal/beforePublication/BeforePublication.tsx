import { Dispatch, SetStateAction } from 'react'

import { IUploadPostImagesResponse } from '@/services'

import s from './BeforePublication.module.scss'

import { AddPostText } from './addPostText/AddPostText'
import { ShowSlides } from './showSlides/ShowSlides'

interface IProps {
  postDescription: string
  setPostDescription: Dispatch<SetStateAction<string>>
  uploadImagesResult?: IUploadPostImagesResponse
}

export const BeforePublication = ({
  postDescription,
  setPostDescription,
  uploadImagesResult,
}: IProps) => {
  return (
    <div className={s.wrapper}>
      <ShowSlides uploadImagesResult={uploadImagesResult} />
      <AddPostText postDescription={postDescription} setPostDescription={setPostDescription} />
    </div>
  )
}
