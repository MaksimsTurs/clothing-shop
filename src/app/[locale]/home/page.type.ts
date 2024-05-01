import type { ProductSection, ProductData } from "@/store/admin/admin.type"

export type WebStatisticProps = { statistic: WebsiteCounts }
export type GetHomeData = { sections?: ProductSection[], products?: ProductData[] } & WebsiteCounts
type WebsiteCounts = { usersCount: number, productsCount: number, ordersCount: number }
