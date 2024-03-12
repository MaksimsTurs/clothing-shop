import scss from '../page.module.scss'

import type { Metadata } from 'next'
import type { UserDataProps } from '../userData.type'

import serverGetUserByToken from '@/server-action/serverGetUserByToken'

import UserCartData from '../component/userCartData'
import UserDataHeader from '../component/userDataHeader'
import UserActionContainer from '../component/userActionContainer'

import getDefaultMeta from '@/util/getDefaultMeta'
import getTranslation from '@/i18n/server'

export async function generateMetadata({ params }: UserDataProps): Promise<Metadata> {
  const user = await serverGetUserByToken(params.token)
	const tr = await getTranslation("Head")
	return {...getDefaultMeta(), title: `${user.firstName} ${user.secondName}`, description: `${tr("user.description")} ${user.firstName} ${user.secondName}`}
}

export default async function Page({ params }: UserDataProps) {
  const user = await serverGetUserByToken(params.token)
  
	return (
		<main className={scss.user_data_container}>
			<div className={scss.user_data_body}>
				<UserDataHeader userData={user} />
				{user.role === 'admin' && <a className={scss.user_admin_link} href={`/ru/admin?token=${user.token}`}>ADMIN PANEL</a>}
				<UserCartData />
        <UserActionContainer/>
			</div>
		</main>
	)
}
