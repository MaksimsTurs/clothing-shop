import type { ChangeEventHandler, Dispatch, SetStateAction } from "react"
import type { ProductData } from "@/store/admin/admin.type"

export type PageProps = { searchParams: {  page?: number, title?: string  } }
export type FilterState = { category: string[], price: number, rating: number }

export type FilterWrapperProps = { title: string }
export type RangeInputProps = { max: number, onChange: ChangeEventHandler<HTMLInputElement> }
export type FilterResultProps = { showFilter: Dispatch<SetStateAction<boolean>>, selectedCategory?: string } & Pick<FilterActionReturn, 'maxProducts' | 'productsRange'>

export type FilterActionParams = { page: number | string } & FilterState
export type FilterActionReturn = { maxPages: number, currPageProducts: ProductData[], productsRange: { min: number, max: number }, maxProducts: number, categories: string[] }