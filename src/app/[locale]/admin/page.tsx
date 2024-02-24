import serverCheckUser from '@/server-action/serverCheckUser'

import AdminPanel from './component/adminPanel'

import type { PageProps } from './admin.type'

import { Fragment } from 'react'
import { redirect } from 'next/navigation'

export default async function Page({ searchParams }: PageProps) {
	const response = await serverCheckUser(searchParams.token)

	if(response.code !== 200) redirect('/home')

	return 	<Fragment>{response.code !== 200 ? null : <AdminPanel/>}</Fragment>
}
