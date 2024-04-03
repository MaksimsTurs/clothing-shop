import fetcher from '@/lib/fetcher/fetcher'

import { REVALIDATE_CONF } from '@/const'

import { FilterActionParams, FilterActionReturn } from '../search.type'

export default async function actionFilteredProduct(filter: FilterActionParams): Promise<FilterActionReturn> {
	try {
		const response = await fetcher.post<FilterActionReturn>('/product/filter-and-pagination', filter, undefined, REVALIDATE_CONF)
		return response
	} catch(error) {
		throw new Error(error as string)
	}
}
