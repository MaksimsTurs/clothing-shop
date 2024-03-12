import type { ProductDataWithCount } from "@/store/user/user.type"

export type CartListProps = { products: ProductDataWithCount[] | null }
export type CartTotalCostProps = { products?: ProductDataWithCount[] | null, deliveryFee?: number  }