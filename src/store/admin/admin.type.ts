import type { ServerResError } from '@/lib/fetcher/fetcher.type'
import type { Roles } from '@/global.type'

export type AdminInitState = {
	products: ProductData[]
	users: UserData[]
	productsSection: ProductSection[]
	order: Order[]
	isAdminActionLoading: boolean
	adminActionError?: ServerResError
}

export type UserData = {
	_id: string
	firstName: string
	secondName: string
	email: string
	token: string
	avatar: string
  createdAt: string
  updatedAt: string
	role: Roles
}

export type ProductData = {
	_id: string
	title: string
	category: string
	description: string
	sectionID: string
  createdAt: string
  updatedAt: string
	price: number
	stock: number
	rating: number | null
	precent: number | null
	images: string[]
}

export type ProductSection = {
	_id: string
	title: string
  createdAt: string
  updatedAt: string
	productsID: string[]
	expiredAt: string
	precent: number | null
  products?: ProductData[]
}

export type Order = {}

//Get store data
export type GetStoreData = { products: ProductData[], productsSection: ProductSection[], users: UserData[], orders: Order }

//Create new product
export type CreateNewProduct = { newProduct: ProductData, updatedSection?: ProductSection }

//Edit product
export type EditProduct = { updatedProduct: ProductData, updatedProductsSection?: ProductSection }

//Add products section
export type AddProductsSectionData = { title: string, productsID: string[], precent: number, expiredDate?: string }
export type AddProductsSectionDataReturn = { newSection: ProductSection }

//Edit products section
export type EditProductsSectionReturn = { updatedProductsSection: ProductSection }

//Remove element from
export type RemoveFrom = 'user' | 'product-section' | 'order' | 'product'
