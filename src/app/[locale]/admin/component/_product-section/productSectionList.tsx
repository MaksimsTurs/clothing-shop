import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'

import type { AdminInitState } from '@/store/admin/admin.type'
import type { RootState } from '@/store/store'

import Table from '../table'

export default function ProductSectionList() {
  const router = useRouter()

  const { productsSection } = useSelector<RootState, AdminInitState>(state => state.admin)

  return(
    <Table theader={['Nr.', 'Название', 'Скрыт', 'Позиция', 'Кол-ство продуктов']}>
      {productsSection.map((section, index) => (
        <tr key={section._id} onClick={() => router.push(`/ru/admin?location=category&id=${section._id}`)}>
          <th>{index + 1}</th>
          <th>{section.title}</th>
          <th>{section.isHidden ? 'Да' : 'Нет'}</th>
          <th>{section.position}</th>
          <th>{section.products?.length}</th>
        </tr>
      ))}
    </Table>
  )
}