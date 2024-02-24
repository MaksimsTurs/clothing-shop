import scss from '../scss/dataList.module.scss'

import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'

import type { AdminInitState } from '@/store/admin/admin.type'
import type { RootState } from '@/store/store'

export default function AllProducts() {
  const router = useRouter()

  const { products } = useSelector<RootState, AdminInitState>(state => state.admin)

  return(
    <table className={scss.data_list_container}>
      <thead>
        <tr>
          <th>Nr.</th>
          <th>Название</th>
          <th>Цена</th>
          <th>В наличии</th>
          <th>Рейтинг</th>
        </tr>
      </thead>
      <tbody>
        {
          products ? products.map((product, index) => (
            <tr key={product._id} onClick={() => router.push(`/ru/admin/product?id=${product._id}`)}>
              <td style={{ textAlign: 'center' }}>{index + 1}</td>
              <td>{product.title}</td>
              <td style={{ textAlign: 'center' }}>{product.price || 0} $</td>
              <td style={{ textAlign: 'center' }}>{product.stock || 0}</td>
              <td style={{ textAlign: 'center' }}>{product.rating || 0}</td>
            </tr>
          )) : null
        }
      </tbody>
    </table>
  )
}