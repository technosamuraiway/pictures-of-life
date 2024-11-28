import { SortDirection } from '@/shared'
import { DownIcon, Tables, Typography, UpIcon } from '@technosamurai/techno-ui-kit'
import clsx from 'clsx'

import s from './HeadTableCell.module.scss'

interface IProps {
  className?: string
  iconCN?: string
  iconHeight?: number
  iconWidth?: number
  isWithArrow?: boolean
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
  sortDirection,
  textCN,
  title,
}: IProps) => {
  const arrowDecider =
    sortDirection === 'asc' ? (
      <UpIcon className={iconCN} height={iconHeight} width={iconWidth} />
    ) : (
      <DownIcon className={iconCN} height={iconHeight} width={iconWidth} />
    )

  return (
    <Tables.TableHeadCell className={s.cell}>
      <div className={clsx(s.wrapper, isWithArrow && s.hover, className)}>
        <Typography className={clsx(s.text, textCN)} variant={'regular-text-14'}>
          {title}
        </Typography>
        {isWithArrow && arrowDecider}
      </div>
    </Tables.TableHeadCell>
  )
}
