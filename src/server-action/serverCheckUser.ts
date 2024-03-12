import fetcher from "@/lib/fetcher/fetcher";

import { REVALIDATE_CONF } from "@/const";

type ReturnType = { code: number; message: string }

export default async function serverCheckUser(token?: string): Promise<ReturnType> {
  try {
    const response = await fetcher.get<ReturnType>(`/admin/check/${token}`, REVALIDATE_CONF)
    return response  
  } catch(error) {
    throw new Error(error as string)
  }
}