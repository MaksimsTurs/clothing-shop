import fetcher from '@/util/fetcher/fetcher'

import type { GetUserByToken } from '../page.type'

import ResponseError from '@/util/exeption/ResponseError'

import { REVALIDATION_TIME } from '../../constant'

export default async function getUserByID(userID?: string): Promise<GetUserByToken> {
	try {
		return await fetcher.get<GetUserByToken>(`/user/${userID}`, { time: REVALIDATION_TIME })
	} catch(error) {
		throw new ResponseError(error)
	}
}
