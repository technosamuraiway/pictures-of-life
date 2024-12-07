import React from 'react'

import { getLayoutWithNav } from '@/widgets'
import { Typography } from '@technosamurai/techno-ui-kit'

import s from './SearchingEmpty.module.scss'

const SearchingEmpty = () => {
  return (
    <div className={s.empty}>
      <Typography className={s.lightgreyText} variant={'bold-text-14'}>
        Oops! This place looks empty!
      </Typography>
      <Typography className={s.greyText} variant={'small-text'}>
        No recent requests
      </Typography>
    </div>
  )
}

SearchingEmpty.getLayout = getLayoutWithNav
export default SearchingEmpty
