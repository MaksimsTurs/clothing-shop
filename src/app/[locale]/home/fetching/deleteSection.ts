import fetcher from "@/util/fetcher/fetcher";

import ResponseError from "@/util/exeption/ResponseError";

export default async function deleteSection(title: string) {
  try {
    return await fetcher.get(`/remove-section/${title}`, { cache: 'no-cache' })
  } catch(error) {
    throw new ResponseError(error)
  }
}