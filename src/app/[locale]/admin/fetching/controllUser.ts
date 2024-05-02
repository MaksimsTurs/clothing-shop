import ResponseError from "@/util/exeption/ResponseError";
import fetcher from "@/util/fetcher/fetcher";

import { REVALIDATION_TIME } from "../../constant";

export default async function actionControllUser(token?: string): Promise<{ isAdmin: boolean }> {
  try {
    return await fetcher.get<{ isAdmin: boolean }>(`/admin/check/${token}`, { time: REVALIDATION_TIME })
  } catch(error) {
    throw new ResponseError(error)
  }
}