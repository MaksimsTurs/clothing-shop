import fetcher from "@/util/fetcher/fetcher";
import ResponseError from "@/util/exeption/ResponseError";

import type { GetHomeData } from "../page.type";

import { REVALIDATION_TIME } from "../../constant";

export default async function getHomeData(): Promise<GetHomeData> {
  try {
    return await fetcher.get<GetHomeData>('/', { time: REVALIDATION_TIME })
  } catch(error) {
    throw new ResponseError(error)
  }
}