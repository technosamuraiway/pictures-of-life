import { ReactNode, useState } from 'react'

import { ExpandIcon } from '@public/createPost/ExpandIcon'
import { Dropdown, Typography } from '@technosamurai/techno-ui-kit'
import clsx from 'clsx'
import { v4 as uuid } from 'uuid'

import s from './RatioChanger.module.scss'

interface RatioDropDownItem {
  isActive: boolean
  itemIcon: ReactNode
  onDropDownItemClick: () => void
  ratioName: string
}

interface IProps {
  ratioDropDownItems: RatioDropDownItem[]
}

export const RatioChanger = ({ ratioDropDownItems }: IProps) => {
  const [openRatioDropDown, setOpenRatioDropDown] = useState<boolean>(false)

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
