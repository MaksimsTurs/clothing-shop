import actionControllUser from './fetching/controllUser'

import Root from './component/root'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Page() {
	const res = await actionControllUser(cookies().get('EB_TOKEN')?.value)
	if(!res.isAdmin) redirect(`/${cookies().get('locale')?.value || 'en'}/home`)
	return <Root/>
}
