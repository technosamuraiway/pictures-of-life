import { Dispatch, SetStateAction, useState } from 'react'

import { FollowersFollowingModal } from '@/entities'
import { useGetPostLikesByPostIdQuery } from '@/services'
import { AddNewFriends, FollowList, useRouterLocaleDefinition } from '@/shared'
import { useMeWithRouter } from '@/shared/hooks/meWithRouter/useMeWithRouter'

interface IProps {
  openModal: boolean
  postId: number
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

export const HomePostLikes = ({ openModal, postId, setOpenModal }: IProps) => {
  const t = useRouterLocaleDefinition()
  const [searchTerm, setSearchTerm] = useState('')
  const { meData: meRequestData } = useMeWithRouter()
  const { data: getLikesData } = useGetPostLikesByPostIdQuery(
    {
      postId,
      search: searchTerm,
    },
    { skip: !meRequestData }
  )

  return (
    <FollowersFollowingModal
      headerTitle={t.posts.likesPost}
      openModal={openModal}
      setOpenModal={setOpenModal}
    >
      {getLikesData?.items.length ? (
        <FollowList
          data={getLikesData?.items}
          isFollowers={false}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      ) : (
        <AddNewFriends isWithButton={false} title={t.posts.emptyList} />
      )}
    </FollowersFollowingModal>
  )
}
