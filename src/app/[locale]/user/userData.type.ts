import type { UserData } from "@/store/user/user.type"

export type UserDataProps = {
  params: { token: string }
}

export type UserDataContainerProps = {
  token?: string
}

export type UserDataHeaderProps = {
  userData?: UserData
}

export type EditUserData = {
  token?: string
} & Pick<UserData, 'avatar' | 'email' | 'firstName' | 'secondName' | 'role'>