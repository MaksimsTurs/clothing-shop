import fetcher from '@/lib/fetcher/fetcher'

import { REVALIDATE_CONF } from '@/const'

import type { ProductData } from '@/store/product/product.type'

export default async function serverGetProductByID(id: number): Promise<ProductData> {
  try {
    const response = await fetcher.get<ProductData>(`/product/get/by-id/${id}`, REVALIDATE_CONF)
    return response  
  } catch(error) {
    throw new Error(error as string)
  }
}
