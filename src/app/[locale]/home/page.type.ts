import type { ProductAction, ProductCategory, ProductData } from "@/store/admin/admin.type"

type WebsiteCounts = { usersCount: number, productsCount: number, ordersCount: number }
export type WebStatisticProps = { statistic: WebsiteCounts }
export type GetHomeData = { 
  products: HomePageProductData[]
  categories: ({ location: string, products: ProductData[], precent?: number } & ProductCategory)[]
  actions: ({ location: string, products: ProductData[], precent?: number } & ProductAction)[]
} & WebsiteCounts

export type HomePageProductData = { location: string, precent?: number } & ProductData