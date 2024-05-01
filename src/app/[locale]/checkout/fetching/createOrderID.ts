import fetcher from "@/util/fetcher/fetcher";

import ResponseError from "@/util/exeption/ResponseError";

import type { CreateOrderID } from "../page.type";

export default async function createOrderID(checkID: string): Promise<CreateOrderID> {
  try {
    return await fetcher.get<CreateOrderID>(`/create-order/${checkID}`, { cache: 'no-cache' })
  } catch(error) {
    throw new ResponseError(error)
  }
}