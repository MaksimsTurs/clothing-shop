import type { ProductData } from "@/store/admin/admin.type"

export type PageProps = { params: { id?: string } }
export type ProductImagePreviewProps = { images: string[] }
export type ProductCountContainerProps = { product: ProductData }
export type DescriptionProps = { text: string }