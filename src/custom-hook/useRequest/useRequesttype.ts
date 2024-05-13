import ResponseError from "@/util/exeption/ResponseError"
import type { Header } from "@/util/fetcher/fetcher.type"

export type UseRequestParams = {
  key?: string
  URL?: string
  body?: any
  disbleCache?: boolean
  header?: Header
}

export type RequestState<T> = {
  isPending: boolean
  data?: T
  error?: ResponseError 
}

export type RequestConstructor = {
  cache: Map<string, any>
  fetch: (params: UseRequestParams) => Promise<any>
}