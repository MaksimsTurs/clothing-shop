'use client'

import scss from '../page.module.scss'

import type { UserInitState } from '@/store/user/user.type'
import type { RootState, AppDispatch } from '@/store/store'

import { useDispatch, useSelector } from 'react-redux'

import removeMe from '@/store/user/action/removeMe'
import { logOut } from '@/store/user/user'

export default function UserActionContainer() {
  const dispatch = useDispatch<AppDispatch>()

  const { userLocal } = useSelector<RootState, UserInitState>(state => state.user)

  const removeUser = () => dispatch(removeMe(userLocal?.token!))
  const onClickLogOut = () => dispatch(logOut())

	return (
		<div className={scss.user_data_actions_container}>
			<button onClick={removeUser} className={scss.user_action_button}>REMOVE ME</button>
			<button onClick={onClickLogOut} className={scss.user_action_button}>LOG OUT</button>
		</div>
	)
}
