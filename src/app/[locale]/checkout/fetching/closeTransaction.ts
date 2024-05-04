import ResponseError from "@/util/exeption/ResponseError";

import fetcher from "@/util/fetcher/fetcher";

import type { UserOrderData } from "../page.type";

export default async function closeTransaction(userOrderData: UserOrderData) {
  try {
    return await fetcher.post(`/close-transaction`, { cache: 'no-cache' }, userOrderData)
  } catch(error) {
    throw new ResponseError(error)
  }
}