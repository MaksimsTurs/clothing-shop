import fetcher from '@/util/fetcher/fetcher'
import ResponseError from '@/util/exeption/ResponseError'

import type { CurrentProductData } from '../page.type'

import { cache } from 'react'

const getProductByID = cache(async(id?: string): Promise<CurrentProductData> => {
  try {
    return await fetcher.get<CurrentProductData>(`/product/${id}`, { cache: 'no-store' })
  } catch(error) {
    throw new ResponseError(error)
  }
})

export default getProductByID