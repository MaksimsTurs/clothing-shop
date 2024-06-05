import type { TResponseError } from "@/global.type"
import type { Header } from "@/util/fetcher/fetcher.type"
import type { Dispatch } from "react"

export type AuthContextObject = { state?: UserAuthState, setState?: Dispatch<UserAuthState> }
export type UserSession = { name: `${string} ${string}`, avatar: string, token: string, id: string, isNew: boolean }
export type UserAuthState = { user?: UserSession, isLoading: boolean, error?: TResponseError }
export type AuthOption = { URL: string, body?: any, header?: Header, redirectOnSucces?: string }