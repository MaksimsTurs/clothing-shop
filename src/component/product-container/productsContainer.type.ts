import type { ProductData } from "@/store/admin/admin.type"

export type ProductsContainerProps = { data?: ProductData[], title?: string, precent?: number, viewAllLink?: boolean, expiredDate?: string }