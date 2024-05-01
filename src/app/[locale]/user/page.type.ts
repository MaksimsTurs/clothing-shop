import type { Order, UserData } from "@/store/admin/admin.type"

export type PageProps = { params: { id: string } }

export type UserHeaderProps = { data: GetUserByToken }
export type OrderListProps = { orders: Order[] }

export type UserButtonProps = { isAdmin: boolean }

export type GetUserByToken = { role: 'admin' | 'user', name: string, order: Order[] } & Pick<UserData, 'avatar' | 'email'>
export type EditUser = { id?: string } & Partial<Pick<UserData, 'avatar' | 'firstName' | 'secondName' | 'email'>>