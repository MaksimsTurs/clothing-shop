import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'

import type { AdminInitState } from '@/store/admin/admin.type'
import type { RootState } from '@/store/store'

import Table from '../table'

export default function ProductList() {
  const router = useRouter()

  const { products } = useSelector<RootState, AdminInitState>(state => state.admin)

  return(
    <Table theader={['Nr.', 'Название', 'Цена', 'В Наличии', 'Скидка', 'Рейтинг']}>
      {products.toSorted((a, b) => a.stock + b.stock).map((product, index) => (
        <tr key={product._id} onClick={() => router.push(`/ru/admin?location=product&id=${product._id}`)}>
          <th>{index + 1}</th>
          <th>{product.title}</th>
          <th>{product.price}€</th>
          <th>{product.stock}</th>
          <th>{((product.precent || 0) * 100).toFixed(2)}%</th>
          <th>{product.rating}</th>
        </tr>
      ))}
    </Table>
  )
}