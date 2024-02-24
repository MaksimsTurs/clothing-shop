export type ProductInitState = {
  maxPages: number
  productsLength: number
  productsRange: { min: number, max: number }
  currPageProducts: ProductData[]
  isLoading: boolean
}

export type ProductSection = {
  _id: string
  title: string
  productID: string[]
  precent: number
}

export type ProductData = {
  _id: string
  title: string
  images: string[]
  price: number
  description: string
  rating: number
  stock: number
  precent?: number
  sectionID?: string
}

export type GetFilteredProduct = {
  category?: string[]
  price?: number
  rating?: number
  page: number
}

export type GetFilteredProductReturn = Required<ProductInitState>