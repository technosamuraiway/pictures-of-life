import { AvatarWithUserName, useRouterLocaleDefinition } from '@/shared'
import { Button } from '@technosamurai/techno-ui-kit'

import s from './FollowerItem.module.scss'

interface IProps {
  navigateToProfile: (id: string) => void
}

export const FollowerItem = ({ navigateToProfile }: IProps) => {
  const t = useRouterLocaleDefinition()

  const navigateToProfileHandler = () => {
    navigateToProfile('1478')
  }

  const followUserHandler = () => {}
  const deleteFollowUserHandler = () => {}

  return (
    <div className={s.infoWrapper}>
      <AvatarWithUserName navigateToProfile={navigateToProfileHandler} />
      <div className={s.buttonsWrapper}>
        <Button onClick={followUserHandler} variant={'primary'}>
          {t.profile.info.stats.followers.follow}
        </Button>
        <Button onClick={deleteFollowUserHandler} variant={'secondary'}>
          {t.profile.info.stats.followers.delete}
        </Button>
      </div>
    </div>
  )
}
