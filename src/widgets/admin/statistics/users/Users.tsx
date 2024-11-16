import { Tabs } from "@technosamurai/techno-ui-kit"
import s from './Users.module.scss'

interface IProps {
    value: string
  } 

  export const Users = ({ value }: IProps) => {
return (
    <>
    <Tabs.Content className={s.usersDiv} value={value}>
        <div>hello users</div>
    </Tabs.Content>
    </>
)
  }