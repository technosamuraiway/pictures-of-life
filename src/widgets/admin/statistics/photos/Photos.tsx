import { Tabs } from "@technosamurai/techno-ui-kit"
import s from './Photos.module.scss'

interface IProps {
    value: string
  } 

  export const Photos = ({ value }: IProps) => {
return (
    <>
    <Tabs.Content className={s.photosDiv} value={value}>
        <div>hello photos</div>
    </Tabs.Content>
    </>
)
  }