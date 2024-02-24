import type { UserData } from "@/store/user/user.type" 
import type { ProductData } from "@/store/product/product.type" 

export type GetPagesCountReturn = {
  pagesCount: number
}

export type GetProductsByPageReturn = {
  products: ProductData[]
}

export type GetAllProductsReturn = {
  productsSections: {
    _id: string
    title?: string
    precent?: number
    items: ProductData[]
  }[]
}

export type CheckPermisstionReturn = {
  statusCode: number
}

export type GetAllDataReturn = {
  users: UserData[]
  products: ProductData[]
  sectionList: string[]
}

export type FilterProductReturn = {
  filteredProducts: ProductData[]
  filteredProductPages: number
}