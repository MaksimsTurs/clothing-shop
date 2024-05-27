import ResponseError from "@/util/exeption/ResponseError"

import type { UserData } from "../admin/admin.type"
import type { CurrentProductData } from "@/app/[locale]/product/page.type"

export type UserInitState = { cart: ProductInLocalStorage[], yourself?: UserClient, userActionError?: ResponseError, isUserActionPending: boolean }
export type UserClient = { name: string, id: string } & Pick<UserData, 'avatar' | 'token'>

export type ProductInLocalStorage = {
  count: number
} & CurrentProductData