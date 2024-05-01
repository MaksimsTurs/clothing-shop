export type TResponseError = { code: number, message: string }
export type Fetching<T> = { data?: T, isLoading: boolean, error?: TResponseError }