import ResponseError from "@/util/exeption/ResponseError";
import fetcher from "@/util/fetcher/fetcher";

export default async function actionControllUser(token?: string): Promise<{ isAdmin: boolean }> {
  try {
    return await fetcher.get<{ isAdmin: boolean }>(`/admin/check/${token}`, { cache: 'no-cache' })
  } catch(error) {
    throw new ResponseError(error)
  }
}