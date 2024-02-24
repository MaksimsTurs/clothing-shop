import type { ProductData } from "@/store/product/product.type"

export type ProductProps = {
  params: { id: number }
}

export type ProductImagePreviewProps = {
  images: string[]
}

export type ProductCountContainerProps = {
  product: ProductData
}