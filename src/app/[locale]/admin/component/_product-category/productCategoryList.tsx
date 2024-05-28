import scss from '../../scss/table.module.scss'

import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import type { AdminInitState, ProductCategory } from '@/store/admin/admin.type'
import type { RootState } from '@/store/store'

import Table from '../table'

import DataTool from '@/store/admin/tool/dataTool'

export default function ProductCategoryList() {
  const [toRender, setToRender] = useState<ProductCategory[]>([])
  const router = useRouter()

  const { productCategory } = useSelector<RootState, AdminInitState>(state => state.admin)

  const dataToRender = toRender.length > 0 ? toRender : productCategory

  return(
    <div className={scss.table_search_container}>
      <div className={scss.table_search_body}>
        <input type="text" placeholder='Найти по названию' onInput={(event) => setToRender(DataTool.findMany<ProductCategory>({ $regex: { title: event.currentTarget.value } }, productCategory))}/>
      </div>
      <Table theader={['Nr.', 'Название', 'Кол-ство продуктов']}>
        {dataToRender.map((category, index) => (
          <tr key={category._id} onClick={() => router.push(`/ru/admin?location=category&id=${category._id}`)}>
            <th>{index + 1}</th>
            <th>{category.title}</th>
            <th>{category.productsID?.length}</th>
          </tr>
        ))}
      </Table>
    </div>
  )
}