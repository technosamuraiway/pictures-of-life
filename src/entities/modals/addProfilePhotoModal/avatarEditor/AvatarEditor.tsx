import { ChangeEvent, ElementRef, RefObject, forwardRef } from 'react'
import Avatar from 'react-avatar-editor'

import { DownloadFile, useRouterLocaleDefinition } from '@/shared'
import { Button } from '@technosamurai/techno-ui-kit'

import s from './AvatarEditor.module.scss'

interface IProps {
  downloadFileRef: RefObject<HTMLInputElement>
  image: File | string
  onAddNewBtnClick: () => void
  onAddNewFile: (e: ChangeEvent<HTMLInputElement>) => void
  onSaveBtnClick: () => void
  onScaleChange: (scale: ChangeEvent<HTMLInputElement>) => void
  scale: number
}

export const AvatarEditor = forwardRef<ElementRef<typeof Avatar>, IProps>(
  (
    {
      downloadFileRef,
      image,
      onAddNewBtnClick,
      onAddNewFile,
      onSaveBtnClick,
      onScaleChange,
      scale,
    },
    ref
  ) => {
    const t = useRouterLocaleDefinition()

    return (
      <div className={s.wrapper}>
        <Avatar borderRadius={170} height={340} image={image} ref={ref} scale={scale} width={340} />
        <input
          defaultValue={'1'}
          max={'2'}
          min={'1'}
          onChange={onScaleChange}
          step={'0.01'}
          type={'range'}
        />
        <DownloadFile
          btnText={t.avatarChange.addNewAvatarBtn}
          onBtnClick={onAddNewBtnClick}
          onChangeFile={onAddNewFile}
          ref={downloadFileRef}
        />
        <Button onClick={onSaveBtnClick}>{t.avatarChange.saveBtn}</Button>
      </div>
    )
  }
)
