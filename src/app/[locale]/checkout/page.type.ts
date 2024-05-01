import type { ProductInLocalStorage } from "@/store/user/user.type"

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

export type CreateOrderID = { orderID: string, sendTo: string }

export type CheckoutProps = { title: string, prices: Partial<Omit<CartCheckResult, 'products' | 'checkID'>>, isLoading?: boolean }
export type CheckoutProductsProps = { products?: ProductInLocalStorage[], title: string }
