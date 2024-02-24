import fetcher from '@/lib/fetcher/fetcher'

import type { ServerResError } from '@/lib/fetcher/fetcher.type'
import type { UserData } from '../user/user.type'

export default async function getUserByToken(token: string): Promise<UserData> {
	try {
    const response = await fetcher.get<UserData>(`/user/get/${token}`)
    return response
	} catch (error) {
		throw new Error((error as ServerResError).message)
	}
}
