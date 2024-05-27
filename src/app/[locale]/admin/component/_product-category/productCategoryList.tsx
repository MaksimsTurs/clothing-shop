import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'

import type { AdminInitState } from '@/store/admin/admin.type'
import type { RootState } from '@/store/store'

import Table from '../table'

export default function ProductCategoryList() {
  const router = useRouter()

  const { productCategory } = useSelector<RootState, AdminInitState>(state => state.admin)

  return(
    <Table theader={['Nr.', 'Название', 'Кол-ство продуктов']}>
      {productCategory.map((category, index) => (
        <tr key={category._id} onClick={() => router.push(`/ru/admin?location=category&id=${category._id}`)}>
          <th>{index + 1}</th>
          <th>{category.title}</th>
          <th>{category.productsID?.length}</th>
        </tr>
      ))}
    </Table>
  )
}