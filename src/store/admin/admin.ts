import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { AdminInitState, GetStoreData, Order, ProductData, ProductAction, ProductCategory, ProductActionAction } from './admin.type'
import type { RemoveFrom } from '@/app/[locale]/admin/page.type'

import insertProduct from './action/insertProduct'
import insertProductAction from './action/insertProductAction'
import insertCategory from './action/insertCategory'

import updateProductAction from './action/updateProductAction'
import updateCategory from './action/updateCategory'
import updateProduct from './action/updateProduct'
import updateUser from './action/updateUser'
import updateSetting from './action/updateSetting'
import updateOrder from './action/changeOrderStatus'

import removeItem from './action/removeItem'

import deleteFrom from './tool/remove'
import update from './tool/update'
import DataTool from './tool/dataTool'

const initialState: AdminInitState = {
	products: [],
	productAction: [],
	users: [],
	orders: [],
	productCategory: [],
	websiteSettings: undefined,
	isAdminActionLoading: false,
	adminActionError: undefined,
}

const adminStore = createSlice({
	name: 'admin',
	initialState,
	reducers: {
		setAdminData: (state, { payload }: PayloadAction<GetStoreData | undefined>) => {
			if(payload) {
				const { orders, products, productAction, users, websiteSettings, productCategory } = payload
				state.orders = orders
				state.products = products
				state.productAction = productAction
				state.productCategory = productCategory
				state.users = users
				state.websiteSettings = websiteSettings
			}
		}
	},
	extraReducers(builder) {
			builder
//------------------------------------Insert actions-----------------------------------------------
//------------------------------------Insert product action----------------------------------------
			.addCase(insertProductAction.pending, state => {
				state.isAdminActionLoading = true
				state.adminActionError = undefined
			})
			.addCase(insertProductAction.fulfilled, (state, { payload }) => {
				const productAction: ProductAction = payload

				if(productAction.categoryID) {
					state.productCategory = DataTool.update<ProductCategory>({ _id: productAction.categoryID }, { actionID: productAction._id }, state.productCategory)
				}			
				
				if(productAction.productsID.length > 0) {
					state.products = DataTool.update<ProductData>({ $in: { _id: productAction.productsID } }, { actionID: productAction._id }, state.products)
				}

				state.productAction = [...state.productAction, productAction]

				state.adminActionError = undefined
				state.isAdminActionLoading = false
			})
		  .addCase(insertProductAction.rejected, (state, { payload }) => {
				state.adminActionError = JSON.parse(payload as string)
				state.isAdminActionLoading = false
			})
//------------------------------------Insert product category------------------------------------
			.addCase(insertCategory.pending, state => {
				state.adminActionError = undefined
				state.isAdminActionLoading = true
			})
			.addCase(insertCategory.fulfilled, (state, { payload }) => {
				const category: ProductCategory = payload

				if(category.productsID.length > 0) {
					state.products = update<ProductData>({ $in: { _id: category.productsID } }, { categoryID: category._id }, state.products)
				}

				state.productCategory = [...state.productCategory, category]

				state.isAdminActionLoading = false
				state.adminActionError = undefined
			})
			.addCase(insertCategory.rejected, (state, { payload }) => {
				state.adminActionError = JSON.parse(payload as string)
				state.isAdminActionLoading = false
			})
//------------------------------------Insert product-----------------------------------------
			.addCase(insertProduct.pending, state => {
				state.isAdminActionLoading = true
				state.adminActionError = undefined
			})
			.addCase(insertProduct.fulfilled, (state, { payload }) => {
				const product: ProductData = payload
				
				state.products = [...state.products, product]

				if(product.actionID) {
					state.productAction = DataTool.update<ProductAction>({ _id: product.actionID }, { $push: { productsID: [product._id] } }, state.productAction)
				} 
				
				if(product.categoryID) {
					state.productCategory = DataTool.update<ProductCategory>({ _id: product.categoryID }, { $push: { productsID: [product._id] }}, state.productCategory)
				}

				state.adminActionError = undefined
				state.isAdminActionLoading = false
			})
			.addCase(insertProduct.rejected, (state, { payload }) => {
				state.adminActionError = JSON.parse(payload as string)
				state.isAdminActionLoading = false
			})
//-----------------------Remove actions-----------------------------------------
			.addCase(removeItem.pending, (state) => {
				state.isAdminActionLoading = true
			})
			.addCase(removeItem.fulfilled, (state, { payload }) => {
				const { from, id } = payload

				switch(from) {
					case 'product':
						state.products = DataTool.remove<ProductData>({ _id: id }, state.products)
						state.productAction = state.productAction.map(action => {
							if(action.productsID.includes(id)) return {...action, productsID: DataTool.remove<string>(id, action.productsID) }
							return action
						})
						state.productCategory = state.productCategory.map(category => {
							if(category.productsID.includes(id)) return {...category, productsID: DataTool.remove<string>(id, category.productsID) }
							return category
						})
					break
					case 'category':
						const category = DataTool.find<ProductCategory>({ _id: id }, state.productCategory) as ProductCategory 
						state.productCategory = DataTool.remove<ProductCategory>({ _id: id }, state.productCategory)!
						state.productAction = state.productAction.map(action => {
							if(action.categoryID === id) return {...action, productsID: action.productsID.filter(_id => !category.productsID.includes(_id)) }
							return action
						})
						state.products = DataTool.update<ProductData>({ categoryID: id }, { categoryID: undefined, actionID: undefined }, state.products)
					break
					case 'order':
						state.orders = deleteFrom<Order>({ _id: id }, state.orders)
					break
					case 'action':
						state.productAction = DataTool.remove<ProductAction>({ _id: id }, state.productAction)
						state.products = DataTool.update<ProductData>({ actionID: id }, { actionID: undefined }, state.products)
						state.productCategory = DataTool.update<ProductCategory>({ actionID: id }, { actionID: undefined }, state.productCategory)
					break
				}

				state.isAdminActionLoading = false
				state.adminActionError = undefined
			})
			.addCase(removeItem.rejected, (state, { payload }) => {
				state.adminActionError = JSON.parse(payload as string)
				state.isAdminActionLoading = false
			})
/*-----------------------------------Update actions------------------------------------------------------*/
/*-----------------------------------Update product------------------------------------------------------*/
			.addCase(updateProduct.pending, state => {
				state.isAdminActionLoading = true
				state.adminActionError = undefined
			})
			.addCase(updateProduct.fulfilled, (state, { payload }) => {
				const product: ProductData = payload

				if(product.actionID) {
					state.productAction = DataTool.update<ProductAction>({ _id: product.actionID }, { $push: { productsID: [product._id] } }, state.productAction)
				} 
				
				if(product.categoryID) {
					state.productCategory = DataTool.update<ProductCategory>({ _id: product.categoryID }, { $push: { productsID: [product._id] }}, state.productCategory)
				}

				state.products = DataTool.update<ProductData>({ _id: product._id }, product, state.products)

				state.isAdminActionLoading = false
				state.adminActionError = undefined
			})
			.addCase(updateProduct.rejected, (state, { payload }) => {
				state.adminActionError = JSON.parse(payload as string)
				state.isAdminActionLoading = false
			})
/*-----------------------------------Update action------------------------------------------------------*/
			.addCase(updateProductAction.pending, (state) => {
				state.isAdminActionLoading = true
				state.adminActionError = undefined
			})
			.addCase(updateProductAction.fulfilled, (state, { payload }) => {
				const action: ProductAction = payload

				if(action.categoryID) {
					state.productCategory = DataTool.update<ProductCategory>({ _id: action.categoryID }, { actionID: payload._id }, state.productCategory)
				}
				
				state.products = DataTool.update<ProductData>({ $in: { _id: action.productsID } }, { actionID: action._id }, state.products)
				
				state.productAction = DataTool.update<ProductAction>({ _id: action._id }, action, state.productAction)

				state.isAdminActionLoading = false
				state.adminActionError = undefined
			})
			.addCase(updateProductAction.rejected, (state, { payload }) => {
				state.adminActionError = JSON.parse(payload as string)
				state.isAdminActionLoading = false
			})
/*-------------------------------------Update category-----------------------------------------------------*/
			.addCase(updateCategory.pending, (state) => {
				state.isAdminActionLoading = true
				state.adminActionError = undefined
			})
			.addCase(updateCategory.fulfilled, (state, { payload }) => {
				const category: ProductCategory = payload

				if(category.actionID) {
					const currAction = DataTool.find({ _id: category._id }, state.productAction) as ProductAction | undefined
					state.productAction = DataTool.update<ProductAction>({ _id: category.actionID }, { categoryID: category._id, productsID: [...currAction?.productsID || [], ...category.productsID] }, state.productAction)
				}

				state.products = DataTool.update<ProductData>({ $in: { _id: category.productsID } }, { categoryID: category._id, actionID: category?.actionID }, state.products)

				state.productCategory = DataTool.update<ProductCategory>({ _id: category._id }, category, state.productCategory)

				state.adminActionError = undefined
				state.isAdminActionLoading = false
			})
			.addCase(updateCategory.rejected, (state, { payload }) => {
				state.adminActionError = JSON.parse(payload as string)
				state.isAdminActionLoading = false
			})
/*-------------------------------------Update user---------------------------------------------------------*/
			.addCase(updateUser.pending, state => {
				state.isAdminActionLoading = true
				state.adminActionError = undefined
			})
			.addCase(updateUser.fulfilled, (state, { payload }) => {
				state.users = DataTool.update({ _id: payload._id }, payload, state.users)

				state.isAdminActionLoading = false
				state.adminActionError = undefined
			})
			.addCase(updateUser.rejected, (state, { payload }) => {
				state.adminActionError = JSON.parse(payload as string)
				state.isAdminActionLoading = false
			})
/*-------------------------------------Edit order------------------------------------------------ */
			.addCase(updateOrder.pending, (state) => {
				state.isAdminActionLoading = true
				state.adminActionError = undefined
			})
			.addCase(updateOrder.rejected, (state, { payload }) => {
				state.adminActionError = JSON.parse(payload as string)
				state.isAdminActionLoading = false
			})
			.addCase(updateOrder.fulfilled, (state, { payload }) => {
				state.orders = update<Order>({ _id: payload.id }, { status: payload.status }, state.orders)
				state.adminActionError = undefined
				state.isAdminActionLoading = false
			})
/*-------------------------------------Edit website setting----------------------------------------------*/
			.addCase(updateSetting.pending, (state) => {
				state.isAdminActionLoading = true
				state.adminActionError = undefined
			})
			.addCase(updateSetting.rejected, (state, { payload }) => {
				state.adminActionError = JSON.parse(payload as string)
				state.isAdminActionLoading = false
			})
			.addCase(updateSetting.fulfilled, (state, { payload }) => {
				state.websiteSettings = payload
				state.adminActionError = undefined
				state.isAdminActionLoading = false
			})
	},
})

export const { setAdminData } = adminStore.actions
export default adminStore.reducer