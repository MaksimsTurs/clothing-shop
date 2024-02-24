import fetcher from '@/lib/fetcher/fetcher'

import type { ServerResError } from '@/lib/fetcher/fetcher.type'
import type { FilterState } from '@/app/[locale]/search/search.type'
import type { FilterProductReturn } from './type/returnTypes.type'

export default async function getFilteredProducts(filterData: FilterState): Promise<FilterProductReturn> {
	try {
    const response = await fetcher.post<FilterProductReturn>(`/post-product-filter`, filterData)
		return response
	} catch (error) {
		throw new Error(error as string)
	}
}
