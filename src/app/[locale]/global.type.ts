import ResponseError from "@/util/exeption/ResponseError"

export type FetchingState<T> = { data?: T, error?: ResponseError, isPending: boolean }