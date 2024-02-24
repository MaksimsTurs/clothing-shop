'use server'

import fetcher from "@/lib/fetcher/fetcher";

import type { ServerResError } from "@/lib/fetcher/fetcher.type";
import { GetFilteredProductReturn } from "@/store/product/product.type";

 const getProductsByPage = async (page: any, filterState: any) => {
    try {
      const response = await fetcher.post<GetFilteredProductReturn>(`/product/pagination/filter/${page}`, filterState)
      return response
    } catch(error) {
      throw Error(error as string)
    }
  }

export default getProductsByPage