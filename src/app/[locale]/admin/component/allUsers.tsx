import scss from '../scss/dataList.module.scss'

import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'

import type { AdminInitState } from '@/store/admin/admin.type'
import type { RootState, AppDispatch } from '@/store/store'

export default function AllUsers() {
  const router = useRouter()

  const { users } = useSelector<RootState, AdminInitState>(state => state.admin)

  return(
    <table className={scss.data_list_container}>
      <thead>
        <tr>
          <th>Nr.</th>
          <th>First Name</th>
          <th>Second Name</th>
          <th>E-Mail</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        {
          users && users.map((user, index) => (
            <tr key={user._id} onClick={() => router.push(`/admin/user?id=${user._id}`)}>
              <td style={{ textAlign: 'center' }}>{index + 1}</td>
              <td style={{ textAlign: 'center' }}>{user.firstName}</td>
              <td style={{ textAlign: 'center' }}>{user.secondName}</td>
              <td style={{ textAlign: 'center' }}>{user.email}</td>
              <td style={{ textAlign: 'center' }}>{user.role}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}