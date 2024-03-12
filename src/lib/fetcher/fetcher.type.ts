export type RevalidateConf = { time?: number, tags?: string[], cache?: 'no-cache' | 'force-cache' | 'no-store' }
export type ServerResError = { code: number, message: string }