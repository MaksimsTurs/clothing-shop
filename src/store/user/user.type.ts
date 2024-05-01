import ResponseError from "@/util/exeption/ResponseError"
import type { UserData, ProductData } from "../admin/admin.type"

export type UserInitState = { cart: ProductInLocalStorage[], yourself?: UserClient, userActionError?: ResponseError, isUserActionPending: boolean }
export type UserClient = { name: string, id: string } & Pick<UserData, 'avatar' | 'token'>

export interface ProductInLocalStorage extends ProductData { count: number }