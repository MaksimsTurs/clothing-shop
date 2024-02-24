import fetcher from "@/lib/fetcher/fetcher";

type ReturnType = { code: number; message: string }

export default async function serverCheckUser(token?: string): Promise<ReturnType> {
  const response = await fetcher.get<ReturnType>(`/admin/check/${token}`, { cache: 'no-store' })
  return response  
}