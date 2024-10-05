import { ReactNode, useState } from 'react'

import { useRouterLocaleDefinition } from '@/shared'
import { ExpandIcon } from '@public/createPost/ExpandIcon'
import { EmptyAvatar } from '@public/profileAvatar/EmptyAvatar'
import { Dropdown, Typography } from '@technosamurai/techno-ui-kit'
import clsx from 'clsx'
import { v4 as uuid } from 'uuid'

import s from './RatioChanger.module.scss'

import { ImageState } from '../ImageEditor'

interface RatioDropDownItem {
  isActive: boolean
  itemIcon: ReactNode
  onDropDownItemClick: () => void
  ratioName: string
}

interface IProps {
  currentAspect: null | number
  setCurrentAspect: (currentAspect: null | number) => void
  updateCurrentImageState: (newState: Partial<ImageState>) => void
}

export const RatioChanger = ({
  currentAspect,
  setCurrentAspect,
  updateCurrentImageState,
}: IProps) => {
  const [openRatioDropDown, setOpenRatioDropDown] = useState<boolean>(false)
  const t = useRouterLocaleDefinition()

  const ratioDropDownItems: RatioDropDownItem[] = [
    {
      isActive: currentAspect === null,
      itemIcon: <EmptyAvatar className={s.ratioOriginalIcon} />,
      onDropDownItemClick: () => onAspectRatioChange(null),
      ratioName: t.createNewPost.editPhotoModal.originalRatio,
    },
    {
      isActive: currentAspect === 1,
      itemIcon: <div className={s.ratioSquareIcon} />,
      onDropDownItemClick: () => onAspectRatioChange(1),
      ratioName: '1:1',
    },
    {
      isActive: currentAspect === 4 / 5,
      itemIcon: <div className={s.ratioPhoneIcon} />,
      onDropDownItemClick: () => onAspectRatioChange(4 / 5),
      ratioName: '4:5',
    },
    {
      isActive: currentAspect === 16 / 9,
      itemIcon: <div className={s.ratioDesktopIcon} />,
      onDropDownItemClick: () => onAspectRatioChange(16 / 9),
      ratioName: '16:9',
    },
  ]

  const onAspectRatioChange = (newAspect: null | number) => {
    setCurrentAspect(newAspect)
    updateCurrentImageState({ aspect: newAspect })
  }

  return (
    <Dropdown.Root
      contentAlign={'start'}
      contentCN={s.dropdownContent}
      contentSide={'top'}
      onOpenChange={setOpenRatioDropDown}
      open={openRatioDropDown}
      trigger={
        <ExpandIcon
          className={clsx(
            s.triggerIcon,
            openRatioDropDown ? s.activeTriggerIcon : s.defaultTriggerIcon
          )}
        />
      }
      triggerCN={s.triggerBtn}
      withArrow={false}
    >
      {ratioDropDownItems.map(item => (
        <Dropdown.Item
          className={clsx(s.dropDownItem, item.isActive && s.activeDropDownItem)}
          key={uuid()}
          onClick={item.onDropDownItemClick}
        >
          <Typography variant={'regular-text-16'}>{item.ratioName}</Typography>
          {item.itemIcon}
        </Dropdown.Item>
      ))}
    </Dropdown.Root>
  )
}
