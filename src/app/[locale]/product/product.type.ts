import type { ProductData } from "@/store/admin/admin.type"

export type PageProps = { params: { id: number } }
export type ProductImagePreviewProps = { images: string[] }
export type ProductCountContainerProps = { product: ProductData }