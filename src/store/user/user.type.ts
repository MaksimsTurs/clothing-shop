import type { UserData, ProductData } from "../admin/admin.type"

export type UserInitState = { cart: ProductInLocalStorage[], userLocal?: UserLocalData, isUserActionLoading: boolean, userErrorMessage: string }
export type UserLocalData = Pick<UserData, 'avatar' | 'firstName' | 'secondName' | 'token'>

export interface ProductInLocalStorage extends ProductData { count: number }