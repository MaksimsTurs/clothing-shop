import scss from '../../scss/table.module.scss'

import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import type { AdminInitState, ProductAction, ProductData } from '@/store/admin/admin.type'
import type { RootState } from '@/store/store'

import Table from '../table'

import formatDate from '@/util/formatDate'

import DataTool from '@/store/admin/tool/dataTool'

export default function ProductActionList() {
  const [toRender, setToRender] = useState<ProductAction[]>([])
  const router = useRouter()

  const { productAction } = useSelector<RootState, AdminInitState>(state => state.admin)

  const dataToRender = toRender.length > 0 ? toRender : productAction

  return(
    <div className={scss.table_search_container}>
      <div className={scss.table_search_body}>
        <input type="text" placeholder='Найти по названию' onInput={(event) => setToRender(DataTool.findMany<ProductAction>({ $regex: { title: event.currentTarget.value } }, productAction))}/>
      </div>
      <Table theader={['Nr.', 'Название', 'Кол-ство продуктов', 'Дата окончания']}>
        {dataToRender.map((section, index) => (
          <tr key={section._id} onClick={() => router.push(`/ru/admin?location=action&id=${section._id}`)}>
            <th>{index + 1}</th>
            <th>{section.title}</th>
            <th>{section.productsID?.length}</th>
            <th>{formatDate(section.expiredAt)}</th>
          </tr>
        ))}
      </Table>
    </div>
  )
}