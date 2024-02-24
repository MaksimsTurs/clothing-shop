import fetcher from '@/lib/fetcher/fetcher'

import { REVALIDATE_CONF } from '@/const'

import type { ProductSectionExtended } from '@/store/admin/admin.type';

type ReturnType = { productsSections: ProductSectionExtended[] }

export default async function serverGetAllProducts(): Promise<ReturnType> {
  try {
    const response = await fetcher.get<ReturnType>('/product/get/all', REVALIDATE_CONF)
    return response  
  } catch(error) {
    throw new Error(error as string)
  }
}
