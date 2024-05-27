import type { ProductInLocalStorage } from "@/store/user/user.type"

export type CartListProps = { products: ProductInLocalStorage[] }
export type CartTotalCostProps = { products?: ProductInLocalStorage[] | null  }