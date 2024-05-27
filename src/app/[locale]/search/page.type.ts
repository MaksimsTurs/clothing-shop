import type { ChangeEventHandler, Dispatch, SetStateAction } from "react"
import type { CurrentProductData } from "../product/page.type"

export type PageProps = { searchParams: {  page?: number, id?: string, location: string  } }
export type FilterState = { categoriesID: string[], price: number, rating: number }

export type FilterWrapperProps = { title: string }
export type RangeInputProps = { max: number, onChange: ChangeEventHandler<HTMLInputElement> }
export type FilterResultProps = { showFilter: Dispatch<SetStateAction<boolean>>, locationTitle?: string } & Pick<FilterActionReturn, 'maxProducts' | 'productsRange'>

export type FilterActionParams = { page: number | string } & FilterState
export type FilterCategory = { _id: string, title: string }
export type FilterActionReturn = { 
  maxPages: number, 
  currPageProducts: CurrentProductData[], 
  locationTitle?: string
  productsRange: { min: number, max: number }, 
  maxProducts: number, 
  categories: FilterCategory[]
}
