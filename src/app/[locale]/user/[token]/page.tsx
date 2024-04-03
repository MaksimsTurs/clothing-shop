import scss from '../page.module.scss'

import type { Metadata } from 'next'
import type { GetUserByToken, UserDataProps } from '../user.type'

import actionGetUserByToken from '../action/actionGetUserByToken'

import UserCartData from '../component/userCartData'
import UserDataHeader from '../component/userDataHeader'
import UserActionContainer from '../component/userActionContainer'
import Error from '@/component/error/error'

import getDefaultMeta from '@/util/getDefaultMeta'
import getTranslation from '@/i18n/server'

import Link from 'next/link'

import handleServerAction from '@/util/handleServerAction'

export async function generateMetadata({ params }: UserDataProps): Promise<Metadata> {
  const { error, data } = await handleServerAction<GetUserByToken>(actionGetUserByToken, [params.token])
	const tr = await getTranslation("Head")

	let userName: string = ''

	if(data) userName = `${data.firstName} ${data.secondName}`
	else userName = error?.message!

	return {...getDefaultMeta(), title: userName, description: `${tr("user.description")} ${userName}`}
}

export default async function Page({ params }: UserDataProps) {
  const { data, error } = await handleServerAction<GetUserByToken>(actionGetUserByToken, [params.token])

	return (
		<main className={scss.user_data_container}>
			{
				error && !data ?
				<Error error={error}/> :
				<div className={scss.user_data_body}>
					<UserDataHeader userData={data} />
					{data!.role === 'admin' && <Link className={scss.user_admin_link} href={`/ru/admin?token=${data!.token}`}>ADMIN PANEL</Link>}
					<UserCartData />
					<UserActionContainer/>
				</div>
			}
		</main>
	)
}