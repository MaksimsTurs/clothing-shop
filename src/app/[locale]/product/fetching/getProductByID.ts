import fetcher from '@/util/fetcher/fetcher'
import ResponseError from '@/util/exeption/ResponseError'

import type { ProductData } from '@/store/admin/admin.type'

import { cache } from 'react'

const getProductByID = cache(async(id?: string): Promise<ProductData> => {
  try {
    return await fetcher.get<ProductData>(`/product/${id}`, { cache: 'no-store' })
  } catch(error) {
    throw new ResponseError(error)
  }
})

export default getProductByID