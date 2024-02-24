import scss from '../page.module.scss'

import type { Metadata } from 'next'
import type { UserDataProps } from '../userData.type'

import serverGetUserByToken from '@/server-action/serverGetUserByToken'

import UserCartData from '../component/userCartData'
import UserDataHeader from '../component/userDataHeader'
import UserActionContainer from '../component/userActionContainer'

export async function generateMetadata({ params }: UserDataProps): Promise<Metadata> {
  const user = await serverGetUserByToken(params.token)
	return { title: user.firstName + ' ' + user.secondName, description: `Profile from ${user.firstName} ${user.secondName}` }
}

export default async function Page({ params }: UserDataProps) {
  const user = await serverGetUserByToken(params.token)
  
	return (
		<main className={scss.user_data_container}>
			<div className={scss.user_data_body}>
				<UserDataHeader userData={user} />
				<UserCartData />
        <UserActionContainer/>
			</div>
		</main>
	)
}
