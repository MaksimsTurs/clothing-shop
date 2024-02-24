'use client'

import type { ServerResError } from "@/lib/fetcher/fetcher.type"
import type { ProductData } from "../product/product.type"

import fetcher from "@/lib/fetcher/fetcher"

export default async function getProductByID(id: number, title: string): Promise<ProductData> {
  try {
    const response = await fetcher.get<ProductData>(`/product/${id}/${title}`)
    return response
  } catch(error) {
    throw new Error((error as ServerResError).message)
  }
}