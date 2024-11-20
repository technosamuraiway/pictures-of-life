import { HeadCell } from '@/entities/tables/paymentsTable/headCell/HeadCell'
import { TableCell } from '@/entities/tables/paymentsTable/tableCell/TableCell'
import { useRouterLocaleDefinition } from '@/shared'
import { DeleteIcon } from '@public/icons'
import { Tables } from '@technosamurai/techno-ui-kit'

import s from './UsersListTable.module.scss'

export const UsersListTable = () => {
  const t = useRouterLocaleDefinition()

  return (
    <>
      <Tables.Table>
        <Tables.TableHead>
          <Tables.TableRow className={s.head}>
            <HeadCell title={'User ID'} />
            <HeadCell title={'Username'} />
            <HeadCell title={'Profile link'} />
            <HeadCell title={'Date added'} />
            <HeadCell title={''} />
          </Tables.TableRow>
        </Tables.TableHead>

        <Tables.TableBody>
          <Tables.TableRow>
            <TableCell icon={<DeleteIcon />} value={'1212'} />
            <TableCell value={'Petr'} />
            <TableCell value={`qwqwqwe@gmail.com`} />
            <TableCell value={'01.01.2017'} />
          </Tables.TableRow>
          <Tables.TableRow>
            <TableCell value={'1212'} />
            <TableCell value={'Petr'} />
            <TableCell value={`qwqwqwe@gmail.com`} />
            <TableCell value={'01.01.2017'} />
          </Tables.TableRow>
        </Tables.TableBody>
      </Tables.Table>
    </>
  )
}
