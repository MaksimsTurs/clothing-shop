export type ProductData = {
  _id: string
  sectionID?: string
  title: string
  description: string
  price: number
  stock: number
  precent?: number
  rating: number
  images: string[]
  categories: string[]
}

export type ProductInitState = {
  maxPages: number
  productsLength: number
  productsRange: { min: number, max: number }
  currPageProducts: ProductData[]
  isLoading: boolean
  filterError?: { code: number, message: string }
}

export type ProductSection = { _id: string, title: string, productID: string[], precent: number }

//For Filter action.
export type GetFilteredProduct = { category?: string[], price?: number, rating?: number, page: number }
export type GetFilteredProductReturn = Required<ProductInitState>