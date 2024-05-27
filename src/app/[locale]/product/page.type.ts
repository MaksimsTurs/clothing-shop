import type { ProductData } from "@/store/admin/admin.type"
import { HomePageProductData } from "../home/page.type"

export type PageProps = { params: { id?: string } }
export type ProductImagePreviewProps = { images: string[] }
export type ProductCountContainerProps = { product: ProductData }
export type DescriptionProps = { text: string }
export type CurrentProductData = {
  precent?: string
  category?: string
  categoryID?: string
} & HomePageProductData