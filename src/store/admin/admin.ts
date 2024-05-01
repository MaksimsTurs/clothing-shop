import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { AdminInitState, GetStoreData, Order, ProductData, ProductSection, UserData } from './admin.type'

import removeItem from './action/removeItem'
import addProduct from './action/addProduct'
import addProductsSection from './action/addProductsSection'
import editUser from './action/editUser'
import editProduct from './action/editProduct'
import editProductsSection from './action/editProductsSection'
import changeOrderStatus from './action/changeOrderStatus'

import { isInclude } from './tool/adminUtils'

import deleteFrom from './tool/deleteFrom'
import updateIn from './tool/updateIn'
import findFrom from './tool/findFrom'
import replaceFrom from './tool/replaceFrom'
import editWebsiteSetting from './action/editWebsiteSetting'

const initialState: AdminInitState = {
	products: [],
	productsSection: [],
	users: [],
	orders: [],
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
				const { orders, products, productsSection, users, websiteSettings } = payload
				state.orders = orders
				state.products = products
				state.productsSection = productsSection
				state.users = users
				state.websiteSettings = websiteSettings
			}
		}
	},
	extraReducers(builder) {
/*--------------------------------------Remove Item------------------------------------------------------*/
			builder.addCase(removeItem.pending, (state) => {
				state.isAdminActionLoading = true
			})
			.addCase(removeItem.fulfilled, (state, { payload }) => {
				const { from, id } = payload

				switch(from) {
					case 'product':
						state.products = deleteFrom<ProductData>({ _id: id }, state.products)!
						state.productsSection = state.productsSection.map(section => ({
							...section, 
							productsID: deleteFrom<string>(id, section.productsID)!, 
							products: deleteFrom<ProductData>({ _id: id }, section.products || []) 
						}))
					break;
					case 'section':
						state.productsSection = deleteFrom<ProductSection>({ _id: id }, state.productsSection)!
						state.products = state.products.map(product => {
							if(product.sectionID === id) return {...product,  category: undefined, sectionID: undefined, precent: 0.00 }
							return product
						}) 
					break;
					case 'order':
						const order = findFrom<Order>({ _id: id }, state.orders) as Order | undefined
					
						if(order) {
							const productsID = order.toBuy.map(product => product._id)

							state.products = state.products.filter(product => !productsID.includes(product._id))

							state.orders = deleteFrom<Order>({ _id: id }, state.orders)
						}

					break
				}

				state.isAdminActionLoading = false
				state.adminActionError = undefined
			})
			.addCase(removeItem.rejected, (state, { payload }) => {
				state.adminActionError = JSON.parse(payload as string)
				state.isAdminActionLoading = false
			})
/*--------------------------------------Remove Item------------------------------------------------------*/
/*--------------------------------------Add product------------------------------------------------------*/
			.addCase(addProduct.pending, state => {
				state.isAdminActionLoading = true
			})
			.addCase(addProduct.fulfilled, (state, { payload }) => {
				const { newProduct, updatedSection } = payload
				
				state.products = [...state.products, newProduct]

				//1) Push product in products section
				if(updatedSection) state.productsSection = updateIn<ProductSection>({ _id: updatedSection._id }, {...updatedSection, $push: { products: [newProduct] } }, state.productsSection)

				state.isAdminActionLoading = false
				state.adminActionError = undefined
			})
			.addCase(addProduct.rejected, (state, { payload }) => {
				state.adminActionError = JSON.parse(payload as string)
				state.isAdminActionLoading = false
			})
/*--------------------------------------Add product------------------------------------------------------*/
/*-------------------------------------Edit product------------------------------------------------------*/
			.addCase(editProduct.pending, state => {
				state.isAdminActionLoading = true
			})
			.addCase(editProduct.fulfilled, (state, { payload }) => {
				const { updatedProduct, updatedCategory } = payload			

				//1) Replace product from products with new product.
				state.products = replaceFrom<ProductData>({ _id: updatedProduct._id }, state.products, updatedProduct)

				//2) Replace/Push product from section products.
				state.productsSection = state.productsSection.map(section => {
					if(section._id === (updatedCategory?._id || updatedProduct.sectionID)) {
						const include: boolean = isInclude(section.productsID, updatedProduct._id)
						return {
							...section, 
							productsID: include ? section.productsID : [...section.productsID, updatedProduct._id], 
							products: include ? replaceFrom<ProductData>({ _id: updatedProduct._id }, section.products!, updatedProduct) : [...section.products || [], updatedProduct]	
						}
					}
					return section
				})

				state.isAdminActionLoading = false
				state.adminActionError = undefined
			})
			.addCase(editProduct.rejected, (state, { payload }) => {
				state.adminActionError = JSON.parse(payload as string)
				state.isAdminActionLoading = false
			})
/*-------------------------------------Edit product------------------------------------------------------*/
/*-------------------------------------Add product section-----------------------------------------------*/
			.addCase(addProductsSection.pending, state => {
				state.isAdminActionLoading = true
			})
			.addCase(addProductsSection.fulfilled, (state, { payload }) => {
				//1) Insert products into new Section
				let products: ProductData[] = []

				for(let index: number = 0; index < state.products.length; index++) {
					const currProduct = state.products[index]
					if(isInclude(payload.productsID, currProduct._id)) {
						const updatedProduct = {...currProduct, precent: payload.precent, sectionID: payload._id, category: payload.title }

						products = [...products, updatedProduct]
						state.products[index] = updatedProduct
					}
				}

				state.productsSection = [...state.productsSection, {...payload, products }]

				state.isAdminActionLoading = false
				state.adminActionError = undefined
			})
		  .addCase(addProductsSection.rejected, (state, { payload }) => {
				state.adminActionError = JSON.parse(payload as string)
				state.isAdminActionLoading = false
			})
/*-------------------------------------Add product section-----------------------------------------------*/
/*-------------------------------------Edit user---------------------------------------------------------*/
			.addCase(editUser.pending, state => {
				state.isAdminActionLoading = true
			})
			.addCase(editUser.fulfilled, (state, { payload }) => {
				state.users = replaceFrom<UserData>({ _id: payload._id }, state.users, payload)

				state.isAdminActionLoading = false
				state.adminActionError = undefined
			})
			.addCase(editUser.rejected, (state, { payload }) => {
				state.adminActionError = JSON.parse(payload as string)
				state.isAdminActionLoading = false
			})
/*-------------------------------------Edit user---------------------------------------------------------*/
/*-------------------------------------Edit product section----------------------------------------------*/
			.addCase(editProductsSection.pending, (state) => {
				state.isAdminActionLoading = true
			})
			.addCase(editProductsSection.fulfilled, (state, { payload }) => {
				let sectionProducts: ProductData[] = []

				//1) Update all products in section
				state.productsSection = state.productsSection.map(section => {
					if(section._id === payload._id) {
						for(let index: number = 0; index < state.products.length; index++) {
							const currProduct = state.products[index]
							if(payload.productsID.includes(currProduct._id)) sectionProducts = [...sectionProducts, {...currProduct, sectionID: section._id, precent: payload.precent, category: payload.title }]
						}
						return {...payload, products: sectionProducts }
					}
					return section
				})

				//2) Update all products
				state.products = state.products.map(product => {
					const searchedProduct = findFrom<ProductData>({ _id: product._id }, sectionProducts) as ProductData
					if(searchedProduct) return searchedProduct
					return product
				})

				state.isAdminActionLoading = false
				state.adminActionError = undefined
			})
			.addCase(editProductsSection.rejected, (state, { payload }) => {
				state.adminActionError = JSON.parse(payload as string)
				state.isAdminActionLoading = false
			})
/*-------------------------------------Edit product section----------------------------------------------*/
/*-------------------------------------Edit order status------------------------------------------------ */
			.addCase(changeOrderStatus.pending, (state) => {
				state.isAdminActionLoading = true
				state.adminActionError = undefined
			})
			.addCase(changeOrderStatus.rejected, (state, { payload }) => {
				state.adminActionError = JSON.parse(payload as string)
				state.isAdminActionLoading = false
			})
			.addCase(changeOrderStatus.fulfilled, (state, { payload }) => {
				state.orders = updateIn<Order>({ _id: payload.id }, { status: payload.status }, state.orders)
				state.adminActionError = undefined
				state.isAdminActionLoading = false
			})
/*-------------------------------------Edit website setting----------------------------------------------*/
/*-------------------------------------Edit website setting----------------------------------------------*/
			.addCase(editWebsiteSetting.pending, (state) => {
				state.isAdminActionLoading = true
				state.adminActionError = undefined
			})
			.addCase(editWebsiteSetting.rejected, (state, { payload }) => {
				state.adminActionError = JSON.parse(payload as string)
				state.isAdminActionLoading = false
			})
			.addCase(editWebsiteSetting.fulfilled, (state, { payload }) => {
				state.websiteSettings = payload
				state.adminActionError = undefined
				state.isAdminActionLoading = false
			})
	},
})

export const { setAdminData } = adminStore.actions
export default adminStore.reducer