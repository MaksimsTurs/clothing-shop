import ResponseError from "@/util/exeption/ResponseError";

import fetcher from "@/util/fetcher/fetcher";

export default async function closeTransaction(token: string, checkID: string, adress: string) {
  try {
    return await fetcher.post(`/close-transaction`, undefined, { checkID, adress, token })
  } catch(error) {
    throw new ResponseError(error)
  }
}