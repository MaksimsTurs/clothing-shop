import fetcher from "@/util/fetcher/fetcher";
import ResponseError from "@/util/exeption/ResponseError";

import type { GetHomeData } from "../page.type";

export default async function getHomeData(): Promise<GetHomeData> {
  try {
    return await fetcher.get<GetHomeData>('/', { cache: 'no-store' })
  } catch(error) {
    throw new ResponseError(error)
  }
}