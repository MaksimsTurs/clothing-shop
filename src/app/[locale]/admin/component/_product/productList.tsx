import scss from '../../scss/table.module.scss'

import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import type { AdminInitState, ProductData } from '@/store/admin/admin.type'
import type { RootState } from '@/store/store'

import Table from '../table'

import DataTool from '@/store/admin/tool/dataTool'

export default function ProductList() {
  const [toRender, setToRender] = useState<ProductData[]>([])
  const router = useRouter()

  const { products } = useSelector<RootState, AdminInitState>(state => state.admin)

  const dataToRender = toRender.length > 0 ? toRender : products

  return(
    <div className={scss.table_search_container}>
      <div className={scss.table_search_body}>
        <input type="text" placeholder='Найти по названию' onInput={(event) => setToRender(DataTool.findMany<ProductData>({ $regex: { title: event.currentTarget.value } }, products))}/>
      </div>
      <Table theader={['Nr.', 'Название', 'Цена', 'В Наличии', 'Рейтинг']}>
        {dataToRender.map((product, index) => (
          <tr key={product._id} onClick={() => router.push(`/ru/admin?location=product&id=${product._id}`)}>
            <th>{index + 1}</th>
            <th>{product.title}</th>
            <th>{product.price}€</th>
            <th>{product.stock}</th>
            <th>{product.rating}</th>
          </tr>
        ))}
      </Table>
    </div>
  )
}