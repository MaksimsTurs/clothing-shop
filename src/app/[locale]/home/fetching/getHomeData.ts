import fetcher from "@/util/fetcher/fetcher";
import ResponseError from "@/util/exeption/ResponseError";

import type { GetHomeData } from "../page.type";

import { cookies } from "next/headers";

export default async function getHomeData(): Promise<GetHomeData> {
  try {
    return await fetcher.get<GetHomeData>('/', { cache: 'no-store' }, { 'Authorization': `Bearer ${cookies().get('EB_TOKEN')?.value}` })
  } catch(error) {
    throw new ResponseError(error)
  }
}