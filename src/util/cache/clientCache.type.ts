export type ClientCache = { 
  _storage: { [key: string]: string }, 
  set: (key: string, prop: any) => void
  get: (key: string) => any
  delete: (key: string) => void
  _isObject: (key: string) => boolean | undefined
}