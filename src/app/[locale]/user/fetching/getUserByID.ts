import fetcher from '@/util/fetcher/fetcher'

import type { GetUserByToken } from '../page.type'

import ResponseError from '@/util/exeption/ResponseError'

export default async function getUserByID(userID?: string): Promise<GetUserByToken> {
	try {
		return await fetcher.get<GetUserByToken>(`/user/${userID}`, { cache: 'no-cache' })
	} catch(error) {
		throw new ResponseError(error)
	}
}
