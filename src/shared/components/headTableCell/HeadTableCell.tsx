import { Dispatch, SetStateAction } from 'react'

import { SortDirection } from '@/services/graphql/codegen/graphql'
import { DownIcon, Tables, Typography, UpIcon } from '@technosamurai/techno-ui-kit'
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
  iconHeight = 16,
  iconWidth = 16,
  isWithArrow = false,
  setSortBy,
  setSortDirection,
  sortBy,
  sortDirection,
  textCN,
  title,
}: IProps) => {
  const arrowDecider =
    sortDirection === SortDirection.Asc ? (
      <UpIcon className={iconCN} height={iconHeight} width={iconWidth} />
    ) : (
      <DownIcon className={iconCN} height={iconHeight} width={iconWidth} />
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
