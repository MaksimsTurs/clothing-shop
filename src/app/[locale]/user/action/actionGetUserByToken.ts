import fetcher from '@/lib/fetcher/fetcher'

import { REVALIDATE_CONF } from '@/const'

import parseJSONError from '@/lib/parseJSONError/parseJSONError'

import type { GetUserByToken } from '../user.type'
import type { ServerResError } from '@/lib/fetcher/fetcher.type'

export default async function actionGetUserByToken(token?: string): Promise<GetUserByToken | ServerResError> {
	try {
		return await fetcher.get<GetUserByToken>(`/user/${token}`, REVALIDATE_CONF)
	} catch(error) {
		return parseJSONError(error)
	}
}
