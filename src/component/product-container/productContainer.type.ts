import type { ProductData } from "@/store/product/product.type"

export type ProductsContainerProps = {
  data: ProductData[]
  title?: string
  precent?: number
  viewAllLink?: boolean
  expiredDate?: string
}