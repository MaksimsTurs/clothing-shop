import scss from '../../scss/dataList.module.scss'

import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'

import type { AdminInitState } from '@/store/admin/admin.type'
import type { RootState } from '@/store/store'

import ErrorLoadingWrapper from '../errorLoadingWrapper'

export default function AllUsers() {
  const router = useRouter()

  const { users, isAdminActionLoading, adminActionError } = useSelector<RootState, AdminInitState>(state => state.admin)

  return(
    <ErrorLoadingWrapper isLoading={isAdminActionLoading} error={adminActionError}>
      <table className={scss.data_list_container}>
        <thead>
          <tr>
            <th>Nr.</th>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Е-маил</th>
            <th>Роль</th>
          </tr>
        </thead>
        <tbody>
          {
            users && users.map((user, index) => (
              <tr key={user._id} onClick={() => router.push(`/ru/admin/item/user?id=${user._id}`)}>
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
    </ErrorLoadingWrapper>
  )
}