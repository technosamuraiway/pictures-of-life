import testImg from '@public/mockAvatar.png'
import { Tabs } from '@technosamurai/techno-ui-kit'
import Image from 'next/image'

import s from './UserPostsImages.module.scss'

interface IProps {
  value: string
}

const data = [testImg.src, testImg.src, testImg.src, testImg.src, testImg.src]

export const UserPostsImages = ({ value }: IProps) => {
  return (
    <Tabs.Content value={value}>
      <div className={s.wrapper}>
        {data.map((el, i) => {
          return (
            <Image alt={'post image'} className={s.img} height={228} key={i} src={el} width={240} />
          )
        })}
      </div>
    </Tabs.Content>
  )
}
