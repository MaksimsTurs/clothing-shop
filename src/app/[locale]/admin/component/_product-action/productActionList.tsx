import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'

import type { AdminInitState } from '@/store/admin/admin.type'
import type { RootState } from '@/store/store'

import Table from '../table'

import formatDate from '@/util/formatDate'

export default function ProductActionList() {
  const router = useRouter()

  const { productAction } = useSelector<RootState, AdminInitState>(state => state.admin)

  return(
    <Table theader={['Nr.', 'Название', 'Кол-ство продуктов', 'Дата окончания']}>
      {productAction.map((section, index) => (
        <tr key={section._id} onClick={() => router.push(`/ru/admin?location=action&id=${section._id}`)}>
          <th>{index + 1}</th>
          <th>{section.title}</th>
          <th>{section.productsID?.length}</th>
          <th>{formatDate(section.expiredAt)}</th>
        </tr>
      ))}
    </Table>
  )
}