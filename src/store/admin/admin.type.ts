import type { ProductData, ProductSection } from "../product/product.type"
import type { UserData } from "../user/user.type"

export type AdminInitState = {
  products: ProductExtended[]
  users: UserExtended[]
  productsSection: ProductSectionExtended[]
  order: Order[]
  isAdminActionLoading: boolean
  adminErrorMessage: string
}

export interface UserExtended extends UserData { createdAt: string, updatedAt: string }
export interface ProductExtended extends ProductData { sectionInfo?: { _id: string, title: string } }
export interface ProductSectionExtended extends ProductSection { products: ProductExtended[], expiredDate?: string }

export type GetStoreData = { products: ProductData[], productsSection: ProductSectionExtended[], users: UserExtended[] }
export type CreateNewProduct = { newProduct: ProductExtended, newSection: ProductSectionExtended }
export type EditProduct = { newProduct: ProductExtended, newSection: ProductSectionExtended }

// For future! 
export type Order = {}