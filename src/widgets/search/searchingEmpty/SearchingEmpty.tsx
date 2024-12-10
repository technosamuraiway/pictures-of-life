import React from 'react'

import { useRouterLocaleDefinition } from '@/shared'
import { getLayoutWithNav } from '@/widgets'
import { Typography } from '@technosamurai/techno-ui-kit'

import s from './SearchingEmpty.module.scss'

const SearchingEmpty = () => {
  const t = useRouterLocaleDefinition()

  return (
    <div className={s.empty}>
      <Typography className={s.lightgreyText} variant={'bold-text-14'}>
        {t.searchPage.emptyPlace}
      </Typography>
      <Typography className={s.greyText} variant={'small-text'}>
        {t.searchPage.noRecentRequests}
      </Typography>
    </div>
  )
}

SearchingEmpty.getLayout = getLayoutWithNav
export default SearchingEmpty
