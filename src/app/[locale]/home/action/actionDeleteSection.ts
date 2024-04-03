import fetcher from '@/lib/fetcher/fetcher'

import { REVALIDATE_CONF } from '@/const'

import parseJSONError from '@/lib/parseJSONError/parseJSONError'

import type { ServerResError } from '@/lib/fetcher/fetcher.type'

export default async function actionDeleteSection(title: string): Promise<ServerResError | undefined> {
	try {
		await fetcher.get<void>(`/section/delete/${title}`, REVALIDATE_CONF)
	} catch(error) {
		return parseJSONError(error)
	}
}