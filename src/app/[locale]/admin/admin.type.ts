import type { ServerResError } from "@/lib/fetcher/fetcher.type";
import type { Dispatch, SetStateAction } from "react"
import type { ProductData, ProductSection } from "@/store/admin/admin.type";

export type PageProps = { searchParams: { token: string; id: string } }
export type RenderDataProps<T> = { option: { data: T[], error?: ServerResError, tableHeader: string[], renderKeys: (keyof T)[], link: string } } 
export type SelectProductProps = { products: ProductData[], precent: number, productsID: string[], setProductsID: Dispatch<SetStateAction<string[]>> }
export type DataPageProps = { id: string, data: any, title: string, ignore?: { forData?: string[] } }
export type ProductFormProps = { dispatchFunc?: any, formWrapperTitle?: string, findedProduct?: ProductData, section?: { _id: string, title: string } }
export type ProductsSectionFormProps = { id?: string, title?: string, dispatchFunc?: any, currentProductsID?: string[] }
export type UserFormProps = { userID: string }
