import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'

import type { AdminInitState } from '@/store/admin/admin.type'
import type { RootState } from '@/store/store'

import Table from '../table'

import isNullOrUndefined from '@/util/isNullOrUndefined'

export default function OrderList() {
  const router = useRouter()

  const { orders } = useSelector<RootState, AdminInitState>(state => state.admin)

  return(
    <Table theader={['Nr.', 'Адресс', 'Кол-ство продуктов']}>
      {orders.map((order, index) => (
        <tr key={order._id} onClick={() => router.push(`/ru/admin?location=order&id=${order._id}`)}>
          <th>{index + 1}</th>
          <th>{isNullOrUndefined(order.adress) ? '[АДРЕСС НЕ ЗАДАН]' : order.adress}</th>
          <th>{order.toBuy.reduce((prev, curr) => prev + curr.count, 0)}</th>
        </tr>
      ))}
    </Table>
  )
}