export type Fetcher = {
  baseURL: string | undefined
  createURL: (URL: string) => string
  getInit: (headers?: Header, body?: any) => { headers: Header, body: any }
  get: <T>(URL: string, revalidation?: FetchRevalidation, headers?: Header) => Promise<T>
  post: <T>(URL: string, revalidation?: FetchRevalidation, body?: any, headers?: Header) => Promise<T>
}

export type FetchRevalidation = { tags?: string[], time?: number, cache?: RequestCache }
export type Header = { [key: string]: string }