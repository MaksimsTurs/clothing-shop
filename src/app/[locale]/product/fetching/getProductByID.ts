import fetcher from '@/util/fetcher/fetcher'
import ResponseError from '@/util/exeption/ResponseError'

import type { CurrentProductData } from '../page.type'

import { cache } from 'react'
import { cookies } from 'next/headers'

const getProductByID = cache(async(id?: string): Promise<CurrentProductData> => {
  try {
    return await fetcher.get<CurrentProductData>(`/product/${id}`, { cache: 'no-store' }, { 'Authorization': `Bearer ${cookies().get('EB_TOKEN')?.value}` })
  } catch(error) {
    throw new ResponseError(error)
  }
})

export default getProductByID