import type { Dispatch, SetStateAction } from "react"
import type { ProductData } from "@/store/admin/admin.type"

export type SearchProps = { searchParams: { page?: number, title?: string } }
export type FilterContainerProps = Required<SearchProps>
export type FilterContainerWrapperProps = { title: string }
export type DressTypeProps = { setFilterState: Dispatch<SetStateAction<FilterState>>, filterState: FilterState }
export type FilterState = { category: string[], price: number, rating: number }
export type FilteredProducts = { filteredProducts?: ProductData[], filteredProductPages?: number }

export type FilterProps = {
  filterState: FilterState
  isChild?: boolean
  refetch: any
  setFilterVisible?: Dispatch<SetStateAction<boolean>>
  setFilterState: Dispatch<SetStateAction<FilterState>>
}

export type FilterRange = {
  setFilterState: Dispatch<SetStateAction<FilterState>>
  filterKey: keyof Omit<FilterState, 'dressType'>
  min: number
  max: number
  filterState: FilterState
}

export type FilterActionParams = { page: number | string, title?: string } & FilterState
export type FilterActionReturn = { maxPages: number, currPageProducts: ProductData[], productsRange: { min: number, max: number }, maxProducts: number, categories: string[] } & FilterState

export type MobileFilterProps = { isFilterVisible: boolean } & Required<Pick<FilterProps, 'filterState' | 'setFilterState' | 'setFilterVisible' | 'refetch'>>