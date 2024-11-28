import { CSSProperties } from 'react'

import { SortDirection } from '@/services/graphql/codegen/graphql'
import { SORT_BY_TYPE } from '@/shared/enums'
import { ArrowDown } from '@public/icons/ArrowDown'
import { ArrowUp } from '@public/icons/ArrowUp'
import { Tables, Typography } from '@technosamurai/techno-ui-kit'
import clsx from 'clsx'

import s from './HeadCellWithArrow.module.scss'

interface IProps {
  arrowDirection?: boolean
  className?: CSSProperties | string
  handleSortDirection: (sortDirection: SortDirection, sortBy: SORT_BY_TYPE) => void
  sortBy: SORT_BY_TYPE
  sortDirection: SortDirection | null
  sortTableOnClick?: () => void
  title: string
}

export const HeadCellWithArrow = ({
  arrowDirection = false,
  className,
  handleSortDirection,
  sortBy,
  sortDirection,
  sortTableOnClick,
  title,
  ...rest
}: IProps) => {
  const arrow = arrowDirection ? 'arrowDownOutline' : 'arrowUpOutline'

  return (
    <Tables.TableHeadCell>
      <div className={clsx(s.wrapper, className)} onClick={sortTableOnClick} {...rest}>
        <Typography variant={'medium-text-14'}>{title}</Typography>
        <div className={s.arrowWrapper}>
          <ArrowUp
            className={clsx(
              sortDirection === SortDirection.Asc ? s.activeTriggerIcon : s.defaultTriggerIcon
            )}
            onClick={() => handleSortDirection(SortDirection.Asc, sortBy)}
          />

          <ArrowDown
            className={clsx(
              sortDirection === SortDirection.Desc ? s.activeTriggerIcon : s.defaultTriggerIcon
            )}
            onClick={() => handleSortDirection(SortDirection.Desc, sortBy)}
          />
        </div>
      </div>
    </Tables.TableHeadCell>
  )
}
