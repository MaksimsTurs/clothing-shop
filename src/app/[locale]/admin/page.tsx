import actionCheckUser from './action/actionControllUser'

import AdminPanel from './component/adminPanel'

import type { PageProps } from './admin.type'

import { Fragment } from 'react'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export default async function Page({ searchParams }: PageProps) {
	const currLanguage = cookies().get('locale')?.value || 'en'
	const response = await actionCheckUser(searchParams.token)

	if(response.code !== 200) redirect(`/${currLanguage}/home`)

	return 	<Fragment>{response.code !== 200 ? null : <AdminPanel/>}</Fragment>
}
