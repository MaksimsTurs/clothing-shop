import fetcher from '@/util/fetcher/fetcher'
import ResponseError from '@/util/exeption/ResponseError'

import type { ProductData } from '@/store/admin/admin.type'

import { REVALIDATION_TIME } from '../../constant'

import { cache } from 'react'

const getProductByID = cache(async(id?: string): Promise<ProductData> => {
  try {
    return await fetcher.get<ProductData>(`/product/${id}`, { time: REVALIDATION_TIME })
  } catch(error) {
    throw new ResponseError(error)
  }
})

export default getProductByID