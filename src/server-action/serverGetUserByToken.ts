import fetcher from '@/lib/fetcher/fetcher'

import { REVALIDATE_CONF } from '@/const'

import type { UserData } from '@/store/user/user.type'

type ReturnType = { role: 'admin' | 'user' } & Required<UserData>

export default async function serverGetUserByToken(token?: string): Promise<ReturnType> {
	try {
		const response = await fetcher.get<ReturnType>(`/user/${token}`, REVALIDATE_CONF)
		return response
	} catch(error) {
		throw new Error(error as string)
	}
}
