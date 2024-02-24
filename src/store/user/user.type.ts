import { ProductData } from "../product/product.type"

export type UserInitState = {
  cart: ProductDataWithCount[]
  userLocal?: UserLocalData
  isUserActionLoading: boolean
  userErrorMessage: string
}

export type UserLocalData = Pick<UserData, 'avatar' | 'firstName' | 'secondName' | 'token'>

export type UserData = {
  _id: string
  role: string
  firstName: string
  secondName: string
  email: string
  avatar?: string
  token: string
}

export interface ProductDataWithCount extends ProductData {
  count: number
}