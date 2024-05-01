import type { RemoveFrom } from "@/app/[locale]/admin/page.type"
import type { TResponseError } from "@/global.type"

export type AdminInitState = {
	products: ProductData[]
	users: UserData[]
	productsSection: ProductSection[]
	websiteSettings?: WebsiteSettings
	orders: Order[]
	isAdminActionLoading: boolean
	adminActionError?: TResponseError
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
	role: 'admin' | 'user'
}

export type ProductData = {
	_id: string
	title: string
	category?: string
	description: string
	sectionID?: string
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
	expiredDate?: string
	precent: number | null
	isHidden: boolean
	position?: number
  products?: ProductData[]
}

export type Order = {
	toBuy: ({ count: number } & ProductData)[] 
	adress: string
	userID: string
	status: OrderStatus
} & Pick<ProductData, '_id' | 'createdAt' | 'updatedAt'>

export type WebsiteSettings = {
	isAllProductsHidden: boolean
	maxProductsPerPage: number
	deliveryFee: number
}

export type OrderStatus = 'SENT' | 'ON-MY-WAY' | 'APPEARED'

//Get store data
export type GetStoreData = Pick<AdminInitState, 'orders' | 'products' | 'productsSection' | 'users' | 'websiteSettings'>

//Create new product
export type CreateNewProduct = { newProduct: ProductData, updatedSection?: ProductSection }

//Edit product
export type EditProduct = { updatedProduct: ProductData, updatedCategory?: ProductSection }

//Product section
export type ProductSectionAction = { id?: string | null } & Partial<Omit<ProductSection, '_id'>>

//Remove item
export type RemoveItemAction = { from: RemoveFrom, id?: string }

//Change status of order
export type ChangeOrderStatus = { id: string, status: OrderStatus }