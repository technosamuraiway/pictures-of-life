import { ReactNode, useState } from 'react'

import { useRouterLocaleDefinition } from '@/shared'
import { ExpandIcon } from '@public/createPost/ExpandIcon'
import { EmptyAvatar } from '@public/profileAvatar/EmptyAvatar'
import { Dropdown, Typography } from '@technosamurai/techno-ui-kit'
import clsx from 'clsx'
import { v4 as uuid } from 'uuid'

import s from './RatioChanger.module.scss'

import { ImageState } from '../../ImageEditor'

interface RatioDropDownItem {
  aspect: null | number
  itemIcon: ReactNode
  ratioName: string
}

interface IProps {
  currentAspect: null | number
  updateCurrentImageState: (newState: Partial<ImageState>) => void
}

export const RatioChanger = ({ currentAspect, updateCurrentImageState }: IProps) => {
  const [openRatioDropDown, setOpenRatioDropDown] = useState<boolean>(false)
  const t = useRouterLocaleDefinition()

  const ratioDropDownItems: RatioDropDownItem[] = [
    {
      aspect: 4 / 3,
      itemIcon: <EmptyAvatar className={s.ratioOriginalIcon} />,
      ratioName: t.createNewPost.editPhotoModal.originalRatio,
    },
    {
      aspect: 1,
      itemIcon: <div className={s.ratioSquareIcon} />,
      ratioName: '1:1',
    },
    {
      aspect: 4 / 5,
      itemIcon: <div className={s.ratioPhoneIcon} />,
      ratioName: '4:5',
    },
    {
      aspect: 16 / 9,
      itemIcon: <div className={s.ratioDesktopIcon} />,
      ratioName: '16:9',
    },
  ]

  const onAspectRatioChangeHandler = (newAspect: null | number) => {
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
          className={clsx(s.dropDownItem, item.aspect === currentAspect && s.activeDropDownItem)}
          key={uuid()}
          onClick={() => onAspectRatioChangeHandler(item.aspect)}
        >
          <Typography variant={'regular-text-16'}>{item.ratioName}</Typography>
          {item.itemIcon}
        </Dropdown.Item>
      ))}
    </Dropdown.Root>
  )
}
