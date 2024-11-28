import {
  BodyTableCell,
  FollowUser,
  HeadTableCell,
  PATH,
  SortDirection,
  convertDate,
  useRouterLocaleDefinition,
} from '@/shared'
import { Tables, Typography } from '@technosamurai/techno-ui-kit'

import { LinkCell } from './linkCell/LinkCell'

interface IProps {
  emptyTableText?: string
  sortDirection?: SortDirection
  tableData: FollowUser[]
}

export const FollowTable = ({ emptyTableText, sortDirection, tableData }: IProps) => {
  const t = useRouterLocaleDefinition()

  if (tableData?.length === 0) {
    return (
      <Typography as={'h1'} style={{ textAlign: 'center' }} variant={'h1'}>
        {emptyTableText}
      </Typography>
    )
  }

  return (
    <Tables.Table>
      <Tables.TableHead>
        <Tables.TableRow>
          <HeadTableCell title={t.admin.userList.tabs.following.userIdHead} />
          <HeadTableCell
            isWithArrow
            sortDirection={sortDirection}
            title={t.admin.userList.tabs.following.userNameHead}
          />
          <HeadTableCell title={t.admin.userList.tabs.following.profileLinkHead} />
          <HeadTableCell
            isWithArrow
            sortDirection={sortDirection}
            title={t.admin.userList.tabs.following.subscriptionDate}
          />
        </Tables.TableRow>
      </Tables.TableHead>

      <Tables.TableBody>
        {tableData.map(table => {
          return (
            <Tables.TableRow key={table.id}>
              <BodyTableCell value={String(table.userId)} />
              <BodyTableCell value={table.userName} />
              <LinkCell
                href={`${PATH.PROFILE.BASEPROFILE}/${table.userId}`}
                value={table.userName}
              />
              <BodyTableCell value={convertDate(table.createdAt)} />
            </Tables.TableRow>
          )
        })}
      </Tables.TableBody>
    </Tables.Table>
  )
}
