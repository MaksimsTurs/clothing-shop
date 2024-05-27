import type { HomePageProductData } from "@/app/[locale]/home/page.type"

export type ProductsContainerProps = { data?: Omit<HomePageProductData, 'location'>[], title?: string, precent?: number, viewAllLink?: boolean, expiredAt?: string, id?: string, location: string }