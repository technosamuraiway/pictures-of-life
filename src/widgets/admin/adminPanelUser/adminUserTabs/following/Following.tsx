import { FollowingTable } from '@/entities'
import { Tabs } from '@technosamurai/techno-ui-kit'

import s from './Following.module.scss'

interface IProps {
  value: string
}

export const Following = ({ value }: IProps) => {
  return (
    <Tabs.Content value={value}>
      <FollowingTable />
    </Tabs.Content>
  )
}
