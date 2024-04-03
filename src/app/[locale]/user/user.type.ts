import type { ServerResError } from "@/lib/fetcher/fetcher.type"
import type { UserData } from "@/store/admin/admin.type"

export type UserDataProps = { params: { token: string } }
export type UserDataContainerProps = { token?: string }
export type UserDataHeaderProps = { userData?: UserData }
export type EditUserData = { token?: string } & Pick<UserData, 'avatar' | 'email' | 'firstName' | 'secondName' | 'role'>

export type GetUserByToken = { role: 'admin' | 'user' } & Required<UserData>