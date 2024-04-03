import type { ProductInLocalStorage } from "@/store/user/user.type"

export type CartListProps = { products: ProductInLocalStorage[] | null }
export type CartTotalCostProps = { products?: ProductInLocalStorage[] | null, deliveryFee?: number  }