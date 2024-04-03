import type { ProductInLocalStorage } from "@/store/user/user.type"

export type CheckoutResult = {
  products: ProductInLocalStorage[]
  error: { code: number, message: string } | undefined
  isLoading: boolean
  totalCost: string
  totalProductsCost: string
  deliveryCost: string
  discount: string
}