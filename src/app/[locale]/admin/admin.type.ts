import type { ProductExtended } from "@/store/admin/admin.type"
import type { ProductData, ProductSection } from "@/store/product/product.type"
import type { Dispatch, SetStateAction } from "react"

export type PageProps = { searchParams: { token: string; id: string } }
export type SelectProductProps = { products: ProductExtended[], precent: number, productsID: string[], setProductsID: Dispatch<SetStateAction<string[]>> }
export type DataPageProps = { id: string, data: any, title: string, ignore?: { forData?: string[] } }
export type ProductFormProps = { dispatchFunc?: any, formWrapperTitle?: string, findedProduct?: ProductData, productSection?: { _id: string, title: string } }
export type ProductsSectionFormProps = { id?: string, title?: string, dispatchFunc?: any, currentProductsID?: string[] }
export type UserFormProps = { userID: string }
export type AddProductsSectionData = { title: string, items: string[], precent: number, expiredDate?: string }
export type AddProductsSectionDataReturn = { section: ProductSection }
export type EditProductsSectionReturn = { newProducts: ProductData[], newSection: ProductSection }

export type ProductFormAction = {
  title: string
  price: number
  inStock: number
  listName: string[]
  images: string[]
  description: string
}
