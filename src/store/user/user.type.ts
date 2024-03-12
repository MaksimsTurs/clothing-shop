import type { Roles } from "@/global.type"
import type { ProductData } from "../product/product.type"

export type UserData = {
  _id: string
  firstName: string
  secondName: string
  avatar?: string
  email: string
  token: string
  role: Roles
}

export type UserInitState = { cart: ProductDataWithCount[], userLocal?: UserLocalData, isUserActionLoading: boolean, userErrorMessage: string }
export type UserLocalData = Pick<UserData, 'avatar' | 'firstName' | 'secondName' | 'token'>

export interface ProductDataWithCount extends ProductData { count: number }