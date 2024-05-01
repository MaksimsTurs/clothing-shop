import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'

import type { AdminInitState } from '@/store/admin/admin.type'
import type { RootState } from '@/store/store'

import Table from '../table'

export default function ProductList() {
  const router = useRouter()

  const { users } = useSelector<RootState, AdminInitState>(state => state.admin)

  return(
    <Table theader={['Nr.', 'Имя', 'Фамилия', 'Е-Майл', 'Роль']}>
      {users.map((user, index) => (
        <tr key={user._id} onClick={() => router.replace(`/ru/admin?location=user&id=${user._id}`)}>
          <th>{index + 1}</th>
          <th>{user.firstName}</th>
          <th>{user.secondName}</th>
          <th>{user.email}</th>
          <th>{user.role}</th>
        </tr>
      ))}
    </Table>
  )
}