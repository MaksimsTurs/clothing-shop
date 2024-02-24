'use server'

import { REVALIDATE_CONF } from '@/const'
import fetcher from '@/lib/fetcher/fetcher'

import type { UserData } from '@/store/user/user.type'

export default async function serverGetUserByToken(token?: string) {
	try {
		const response = await fetcher.get<UserData>(`/user/${token}`, REVALIDATE_CONF)
		return response
	} catch(error) {
		throw new Error(error as string)
	}
}
