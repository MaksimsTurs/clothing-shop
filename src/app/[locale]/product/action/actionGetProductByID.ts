import fetcher from '@/lib/fetcher/fetcher'

import { REVALIDATE_CONF } from '@/const'

import type { ProductData } from '@/store/admin/admin.type'
import type { ServerResError } from '@/lib/fetcher/fetcher.type'

import parseJSONError from '@/lib/parseJSONError/parseJSONError'

export default async function getProductByID(id: number): Promise<ProductData | ServerResError> {
  try {
    return await fetcher.get<ProductData>(`/product/${id}`, REVALIDATE_CONF)
  } catch(error) {
    return parseJSONError(error)
  }
}
