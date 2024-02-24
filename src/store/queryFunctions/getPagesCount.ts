'use client'

import fetcher from "@/lib/fetcher/fetcher";

import type { GetPagesCountReturn } from "./type/returnTypes.type";
import type { ServerResError } from "@/lib/fetcher/fetcher.type";

export default async function getPagesCount(): Promise<GetPagesCountReturn> {
  try {
    const response = await fetcher.get<GetPagesCountReturn>('/get-product-count')
    return response
  } catch(error) {
    throw new Error((error as ServerResError).message)
  }
}