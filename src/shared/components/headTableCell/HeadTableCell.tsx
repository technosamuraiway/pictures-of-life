import { Dispatch, SetStateAction } from 'react'

import { SortDirection } from '@/services/graphql/codegen/graphql'
import { ArrowDown } from '@public/icons/ArrowDown'
import { ArrowUp } from '@public/icons/ArrowUp'
import { Tables, Typography } from '@technosamurai/techno-ui-kit'
import clsx from 'clsx'

import s from './HeadTableCell.module.scss'

interface IProps {
  className?: string
  iconCN?: string
  iconHeight?: number
  iconWidth?: number
  isWithArrow?: boolean
  setSortBy?: Dispatch<SetStateAction<string>>
  setSortDirection?: Dispatch<SetStateAction<SortDirection>>
  sortBy?: string
  sortDirection?: SortDirection
  textCN?: string
  title: string
}

export const HeadTableCell = ({
  className,
  iconCN,
  iconHeight = 10,
  iconWidth = 10,
  isWithArrow = false,
  setSortBy,
  setSortDirection,
  sortBy,
  sortDirection,
  textCN,
  title,
}: IProps) => {
  const arrowDecider = (
    <div className={s.arrows}>
      <ArrowUp
        className={clsx(
          sortDirection === SortDirection.Asc ? s.activeTriggerIcon : s.defaultTriggerIcon,
          iconCN
        )}
        height={iconHeight}
        width={iconWidth}
      />
      <ArrowDown
        className={clsx(
          sortDirection === SortDirection.Desc ? s.activeTriggerIcon : s.defaultTriggerIcon,
          iconCN
        )}
        height={iconHeight}
        width={iconWidth}
      />
    </div>
  )

  const sortClickHandler = () => {
    if (setSortDirection) {
      setSortDirection(sortDirection === SortDirection.Asc ? SortDirection.Desc : SortDirection.Asc)

      if (setSortBy && sortBy) {
        setSortBy(sortBy)
      }
    }
  }

  return (
    <Tables.TableHeadCell className={s.cell}>
      <div
        className={clsx(s.wrapper, isWithArrow && s.hover, className)}
        onClick={sortClickHandler}
      >
        <Typography className={clsx(s.text, textCN)} variant={'regular-text-14'}>
          {title}
        </Typography>
        {isWithArrow && arrowDecider}
      </div>
    </Tables.TableHeadCell>
  )
}
