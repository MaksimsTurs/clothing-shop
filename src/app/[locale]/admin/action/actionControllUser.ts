import fetcher from "@/lib/fetcher/fetcher";

import { REVALIDATE_CONF } from "@/const";

import type { ServerResError } from "@/lib/fetcher/fetcher.type";

export default async function actionCheckUser(token?: string): Promise<ServerResError> {
  try {
    const response = await fetcher.get<ServerResError>(`/admin/check/${token}`, REVALIDATE_CONF)
    return response  
  } catch(error) {
    throw new Error(error as string)
  }
}