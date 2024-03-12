import type { Dispatch, SetStateAction } from "react"
import type { ProductData } from "@/store/product/product.type"

export type SearchProps = { searchParams: { page?: number } }
export type FilterContainerWrapperProps = { title: string }
export type DressTypeProps = { setFilterState: Dispatch<SetStateAction<FilterState>>, filterState: FilterState }
export type FilterState = { category: string[], price: number, rating: number }
export type FilteredProducts = { filteredProducts?: ProductData[], filteredProductPages?: number }

export type FilterProps = {
  filterState: FilterState
  isChild?: boolean
  setFilterVisible?: Dispatch<SetStateAction<boolean>>
  setFilterActive: Dispatch<SetStateAction<boolean>>
  setFilterState: Dispatch<SetStateAction<FilterState>>
}

export type FilterRange = {
  setFilterState: Dispatch<SetStateAction<FilterState>>
  filterKey: keyof Omit<FilterState, 'dressType'>
  min: number
  max: number
  filterState: FilterState
}