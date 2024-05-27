import type { RemoveFrom } from "@/app/[locale]/admin/page.type"
import type { TResponseError } from "@/global.type"

export type AdminInitState = {
	products: ProductData[]
	users: UserData[]
	productAction: ProductAction[]
	productCategory: ProductCategory[]
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
	categoryID?: string
	actionID?: string
	title: string
	description: string
  createdAt: string
  updatedAt: string
	price: number
	stock: number
	rating: number
	images: string[]
}

export type ProductCategory = {
	actionID?: string
} & Pick<ProductAction, '_id' | 'createdAt' | 'productsID' | 'title' | 'updatedAt' | 'isHidden' | 'position'>

export type ProductAction = {
	_id: string
	categoryID?: string
	productsID: string[]
	title: string
  createdAt: string
  updatedAt: string
	expiredAt?: string
	precent: number
	isHidden: boolean
	position?: number
}

export type Order = {
	toBuy: ({ count: number } & ProductData)[] 
	adress: string
	city: string
	plz: string
	status: OrderStatus
} & Pick<ProductData, '_id' | 'createdAt' | 'updatedAt'> & Pick<UserData, 'firstName' | 'secondName' | 'email'>

export type WebsiteSettings = {
	isAllProductsHidden: boolean
	maxProductsPerPage: number
	deliveryFee: number
}

export type OrderStatus = 'SENT' | 'ON-MY-WAY' | 'APPEARED'

export type InsertOrUpdateAction = {
	categoryName: string
} & ProductAction

export type InsertOrUpdateCategory = {
	actionName: string
} & ProductCategory

export type GetStoreData = Pick<AdminInitState, 'orders' | 'products' | 'productAction' | 'users' | 'websiteSettings' | 'productCategory'>

//Remove item
export type RemoveItemAction = { from: RemoveFrom, id?: string }
















//Product section
export type ProductActionAction = { id?: string | null } & Partial<Omit<ProductAction, '_id'>>

//Change status of order
export type ChangeOrderStatus = { id: string, status: OrderStatus }