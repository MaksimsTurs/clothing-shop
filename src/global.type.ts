import type { ServerResError } from "./lib/fetcher/fetcher.type"

export type ErrorPageProps = { error: { message: string, code: number, digest?: string } }
export type Currency = '$' | '€'
export type Roles = 'admin' | 'user'
export type FetchResult<T> = { error?: ServerResError, data?: T, isLoading: boolean }