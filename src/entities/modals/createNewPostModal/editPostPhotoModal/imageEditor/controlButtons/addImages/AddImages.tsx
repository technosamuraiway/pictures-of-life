import { Dispatch, SetStateAction, useState } from 'react'

import { DownloadFile, useRouterLocaleDefinition } from '@/shared'
import { ActiveEmptyAvatar } from '@public/createPost/ActiveEmptyAvatar'
import { AddNewImage } from '@public/createPost/AddNewImage'
import { EmptyAvatar } from '@public/profileAvatar/EmptyAvatar'
import { Dropdown, Scrollbar } from '@technosamurai/techno-ui-kit'
import clsx from 'clsx'
import Image from 'next/image'
import { v4 as uuid } from 'uuid'

import s from './AddImages.module.scss'

interface IProps {
  currentImageIndex: number
  images: string[]
  setCurrentImageIndex: (currentImageIndex: number) => void
  setDownloadedImage: Dispatch<SetStateAction<string[]>>
}

const MAX_FILE_SIZE = 20 * 1024 * 1024 // 20 МБ в байтах

export const AddImages = ({
  currentImageIndex,
  images,
  setCurrentImageIndex,
  setDownloadedImage,
}: IProps) => {
  const [openAddImageDropDown, setOpenAddImageDropDown] = useState<boolean>(false)
  const t = useRouterLocaleDefinition()

  return (
    <Dropdown.Root
      contentAlign={'end'}
      contentCN={s.dropdownContent}
      contentSide={'top'}
      onOpenChange={setOpenAddImageDropDown}
      open={openAddImageDropDown}
      trigger={
        openAddImageDropDown ? (
          <ActiveEmptyAvatar className={clsx(s.triggerIcon, s.activeTriggerIcon)} />
        ) : (
          <EmptyAvatar className={clsx(s.triggerIcon, s.defaultTriggerIcon)} />
        )
      }
      triggerCN={s.triggerBtn}
      withArrow={false}
    >
      <Scrollbar maxWidth={350}>
        <div className={s.imagesWrapper}>
          {images.map((item, index) => {
            return (
              <Dropdown.Item
                className={clsx(currentImageIndex === index && s.activeDropDownItem)}
                key={uuid()}
                onClick={() => setCurrentImageIndex(index)}
              >
                <Image alt={'Image'} className={s.imageItem} height={82} src={item} width={80} />
              </Dropdown.Item>
            )
          })}
          <DownloadFile
            btnCN={s.addImageBtn}
            btnText={<AddNewImage className={s.addNewImage} />}
            btnVariant={'textButton'}
            errorSizeText={t.createNewPost.addPhotoModal.errorSizeText}
            maxImgSize={MAX_FILE_SIZE}
            multiple
            setImage={setDownloadedImage}
          />
        </div>
      </Scrollbar>
    </Dropdown.Root>
  )
}
