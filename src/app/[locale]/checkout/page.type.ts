import type { ProductInLocalStorage } from "@/store/user/user.type"
import { Dispatch, MutableRefObject, SetStateAction } from "react"

export type CartCheckResult = {
  products: ProductInLocalStorage[]
  warnings: CheckoutWarning[]
  totalItemsPrice: number
  totalPriceWithDiscount: number
  totalOrderPrice: number
  discount: number
  delivery: number
  checkID: string
}

export type CheckoutWarning = 'COUNT_BIGGER_THEN_STOCK'

export type ToCheck = { _id: string, count: number }

export type CreateOrder = { id: string, status: string }

export type CheckoutProps = { title: string, prices: Partial<Omit<CartCheckResult, 'products' | 'checkID'>>, isLoading?: boolean }
export type CheckoutProductsProps = { products?: ProductInLocalStorage[], title: string }
export type PageProps = { searchParams: { checkID?: string } }
export type PaypalButtonProps = { orderData: UserOrderData, setIsPaymentModalOpen: Dispatch<SetStateAction<boolean>> }
export type UserOrderData = { 
  checkID: string, 
  orderID: string
  firstName: string, 
  secondName: string, 
  token: string, 
  adress: string, 
  city: string, 
  plz: string, 
  email: string
}
