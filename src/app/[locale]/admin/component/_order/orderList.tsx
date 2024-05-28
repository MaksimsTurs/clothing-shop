import scss from '../../scss/table.module.scss'

import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import type { AdminInitState, Order } from '@/store/admin/admin.type'
import type { RootState, AppDispatch } from '@/store/store'

import Table from '../table'

import isNullOrUndefined from '@/util/isNullOrUndefined'

import DataTool from '@/store/admin/tool/dataTool'

export default function OrderList() {
  const [toRender, setToRender] = useState<Order[]>([])
  const router = useRouter()

  const { orders } = useSelector<RootState, AdminInitState>(state => state.admin)

  const dataToRender: Order[] = toRender.length > 0 ? toRender : orders

  return(
    <div className={scss.table_search_container}>
      <div className={scss.table_search_body}>
        <input type="text" placeholder='Найти по названию' onInput={(event) => setToRender(DataTool.findMany<Order>({ $regex: { city: event.currentTarget.value } }, orders))}/>
      </div>
      <Table theader={['Nr.', 'Адресс', 'Кол-ство продуктов']}>
        {dataToRender.map((order, index) => (
          <tr key={order._id} onClick={() => router.push(`/ru/admin?location=order&id=${order._id}`)}>
            <th>{index + 1}</th>
            <th>{isNullOrUndefined(order.adress) ? '[АДРЕСС НЕ ЗАДАН]' : order.adress}</th>
            <th>{order.toBuy.reduce((prev, curr) => prev + curr.count, 0)}</th>
          </tr>
        ))}
      </Table>
    </div>
  )
}