import type { ProductSection, ProductData } from "@/store/admin/admin.type"

export type WebStatisticProps = { usersNumber: number, productsNumber: number, brandsNumber: number }
export type GetAll = { sections: ProductSection[], products: ProductData[], usersNumber: number, productsNumber: number, brandsNumber: number }
