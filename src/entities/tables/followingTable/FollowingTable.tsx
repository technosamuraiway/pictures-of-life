import { BodyTableCell, HeadTableCell, useRouterLocaleDefinition } from '@/shared'
import { Tables } from '@technosamurai/techno-ui-kit'

import s from './FollowingTable.module.scss'

import { LinkCell } from './linkCell/LinkCell'

export const FollowingTable = () => {
  const t = useRouterLocaleDefinition()

  return (
    <Tables.Table>
      <Tables.TableHead>
        <Tables.TableRow>
          <HeadTableCell textCN={s.text} title={t.admin.userList.tabs.following.userIdHead} />
          <HeadTableCell
            isWithArrow
            sortDirection={'desc'}
            textCN={s.text}
            title={t.admin.userList.tabs.following.userNameHead}
          />
          <HeadTableCell textCN={s.text} title={t.admin.userList.tabs.following.profileLinkHead} />
          <HeadTableCell
            isWithArrow
            sortDirection={'desc'}
            textCN={s.text}
            title={t.admin.userList.tabs.following.subscriptionDate}
          />
        </Tables.TableRow>
      </Tables.TableHead>

      <Tables.TableBody>
        {['142323', 'sdfg', 'sdg', 'sdfg'].map(table => {
          return (
            <Tables.TableRow key={'gsd'}>
              <BodyTableCell value={'1234'} />
              <BodyTableCell value={'1234'} />
              <LinkCell href={'gfsdfg'} value={'1234'} />
              <BodyTableCell value={'1234'} />
            </Tables.TableRow>
          )
        })}
      </Tables.TableBody>
    </Tables.Table>
  )
}
