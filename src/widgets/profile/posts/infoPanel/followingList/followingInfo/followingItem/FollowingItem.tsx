import { AvatarWithUserName, useRouterLocaleDefinition } from '@/shared'
import { Button } from '@technosamurai/techno-ui-kit'

import s from './FollowingItem.module.scss'

interface IProps {
  navigateToProfile: (id: string) => void
}

export const FollowingItem = ({ navigateToProfile }: IProps) => {
  const t = useRouterLocaleDefinition()

  const navigateToProfileHandler = () => {
    navigateToProfile('1478')
  }
  const result = true

  const unfollowUserHandler = () => {}
  const followUserHandler = () => {}

  return (
    <div className={s.infoWrapper}>
      <AvatarWithUserName navigateToProfile={navigateToProfileHandler} />
      <div className={s.buttonsWrapper}>
        <Button
          onClick={result ? unfollowUserHandler : followUserHandler}
          variant={result ? 'outline' : 'primary'}
        >
          {result ? t.profile.info.stats.followers.unFollow : t.profile.info.stats.followers.follow}
        </Button>
      </div>
    </div>
  )
}
