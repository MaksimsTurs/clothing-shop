import type { Header } from "@/util/fetcher/fetcher.type"
import type { Dispatch } from "react"

export type AuthContextObject = { user?: UserSession, setUser?: Dispatch<UserSession | undefined> }
export type UserSession = { name: `${string} ${string}`, avatar: string, token: string, id: string }
export type AuthOption = { URL: string, type: 'post' | 'get', body?: any, header?: Header, redirectOnSucces?: string }