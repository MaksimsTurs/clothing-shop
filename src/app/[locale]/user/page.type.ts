import type { Order, UserData } from "@/store/admin/admin.type"

export type PageProps = { params: { id: string } }

export type UserHeaderProps = { userData: GetUserByToken }
export type OrderListProps = { orders: Order[] }

export type UserButtonProps = { isAdmin: boolean }

export type GetUserByToken = { role: 'ADMIN' | 'USER', name: string, order: Order[] } & Pick<UserData, 'avatar' | 'email'>
export type EditUser = { id?: string } & Partial<Pick<UserData, 'avatar' | 'firstName' | 'secondName' | 'email'>>