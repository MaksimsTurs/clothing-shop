import type { ServerResError } from "@/lib/fetcher/fetcher.type"

type ServerResponse<T> = { data?: T, error?: ServerResError }  

export default async function handleServerAction<T>(fetchCallback:(...params: any) => Promise<any>, params?: any[]): Promise<ServerResponse<T>> {
  const response = await fetchCallback(...params || [])
  if('message' in response) return { error: response }
  return { data: response }
}