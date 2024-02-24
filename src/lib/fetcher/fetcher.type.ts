export type Fetcher = {
  baseURL: string | undefined
  createURL: (URL: string) => string
  validateFetchData: (heaeders?: Headers, body?: any) => { body: {}, header: {} }
  get: <T>(URL: string, revalidate?: RevalidateConf) => Promise<T> 
  post: <T>(URL: string, body?: any, headers?: Headers, revalidate?: RevalidateConf) => Promise<T>
}

export type RevalidateConf = {
  time?: number
  tags?: string[]
  cache?: 'no-cache' | 'force-cache' | 'no-store'
}

export type ServerResError = {
  code: number
  message: string
}