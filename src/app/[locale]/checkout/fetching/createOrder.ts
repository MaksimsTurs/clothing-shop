import fetcher from "@/util/fetcher/fetcher";

import ResponseError from "@/util/exeption/ResponseError";

import type { CreateOrder } from "../page.type";

export default async function createOrder(checkID: string): Promise<CreateOrder> {
  try {
    return await fetcher.get<CreateOrder>(`/create-order/${checkID}`, { cache: 'no-cache' })
  } catch(error) {
    throw new ResponseError(error)
  }
}