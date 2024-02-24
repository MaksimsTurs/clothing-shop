import { createSlice } from '@reduxjs/toolkit'

import type { AdminInitState, ProductExtended } from './admin.type'

import getStoreData from './action/getStoreData'
import addProduct from './action/addProduct'
import addProductsSection from './action/addProductsSection'
import editUser from './action/editUser'
import editProduct from './action/editProduct'
import editProductsSection from './action/editProductsSection'

import parseJSONError from '@/lib/parseJSONError/parseJSONError'
import { isInclude, isIncludeInsertProp, replaceByCondition, replaceWhenInclude } from './adminUtils'

const initialState: AdminInitState = {
	products: [],
	productsSection: [],
	users: [],
	isAdminActionLoading: false,
	adminErrorMessage: '',
}

const adminStore = createSlice({
	name: 'admin',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getStoreData.pending, (state) => {
				state.isAdminActionLoading = true
			})
			.addCase(getStoreData.fulfilled, (state, { payload }) => {
				const { products, productsSection, users } = payload

				state.products = products
				state.users = users

				state.productsSection = productsSection.map(section => ({
					...section, 
					products: isIncludeInsertProp({
						includeOption: { inclArray: section.productID, inclKey: '_id' },
						newPropOption: { newPropName: 'sectionID', newPropKey: '_id' }
					}, state.products)
				}))

				state.isAdminActionLoading = false
			})
			.addCase(getStoreData.rejected, (state, { payload }) => {
				const error = parseJSONError(payload as string)
				state.adminErrorMessage = error.message
				state.isAdminActionLoading = false
			})
			.addCase(addProduct.pending, state => {
				state.isAdminActionLoading = true
			})
			.addCase(addProduct.fulfilled, (state, { payload }) => {
				const { newProduct, newSection } = payload
				
				state.products = [...state.products, newProduct]

				if (Object.entries(newSection).length > 0) {
					state.productsSection = state.productsSection.map(section => {
						if(section._id === newSection._id) {
							return {
								...newSection, 
								products: replaceWhenInclude({
									inclArray: section.productID,
									inclKey: '_id'
								}, state.products, newProduct)
							}
						} 
						
						return section
					})
				}

				state.isAdminActionLoading = false
			})
			.addCase(addProduct.rejected, (state, { payload }) => {
				const error = parseJSONError(payload as string)
				state.adminErrorMessage = error.message
				state.isAdminActionLoading = false
			})
			.addCase(editProduct.pending, state => {
				state.isAdminActionLoading = true
			})
			.addCase(editProduct.fulfilled, (state, { payload }) => {
				const { newProduct, newSection } = payload

				state.products = replaceByCondition('_id', state.products, newProduct)

				state.productsSection = state.productsSection.map(section => {
					if(section._id === newSection._id) {
						return {
							...newSection, 
							products: replaceWhenInclude({
								inclArray: section.productID,
								inclKey: '_id'
							}, state.products, newProduct)
						}
					}
					
					return section
				})

				state.isAdminActionLoading = false
			})
			.addCase(editProduct.rejected, (state, { payload }) => {
				const error = parseJSONError(payload as string)
				state.adminErrorMessage = error.message
				state.isAdminActionLoading = false
			})

			.addCase(addProductsSection.pending, state => {
				state.isAdminActionLoading = true
			})
			.addCase(addProductsSection.fulfilled, (state, { payload }) => {
				const { products, section } = payload

				state.productsSection = [...state.productsSection, {...section, products: []}]
				state.products = state.products.map(product => {
					if (isInclude(section.productID, product._id)) {
						return {...product, sectionID: payload.section._id, precent: payload.section.precent}
					}

					return product
				})

				state.isAdminActionLoading = false
			})
			.addCase(addProductsSection.rejected, (state, { payload }) => {
				const error = parseJSONError(payload as string)
				state.adminErrorMessage = error.message
				state.isAdminActionLoading = false
			})
			.addCase(editUser.pending, state => {
				state.isAdminActionLoading = true
			})
			.addCase(editUser.fulfilled, (state, { payload }) => {
				state.users = replaceByCondition('_id', state.users, payload)
				state.isAdminActionLoading = false
			})
			.addCase(editUser.rejected, (state, { payload }) => {
				const error = parseJSONError(payload as string)
				state.adminErrorMessage = error.message
				state.isAdminActionLoading = false
			})
			.addCase(editProductsSection.pending, (state) => {
				state.isAdminActionLoading = true
			})
			.addCase(editProductsSection.fulfilled, (state, { payload }) => {
				const { newProducts, newSection } = payload
				let sectionProducts: ProductExtended[] = []

				state.products = newProducts

				state.productsSection = state.productsSection.map(section => {
					if(section._id === newSection._id) {
						for(let index = 0; index < state.products.length; index++) {
							if(newSection.productID.includes(state.products[index]._id)) {
								sectionProducts = [...sectionProducts, {...state.products[index], sectionID: section._id, precent: newSection.precent}]
							}
						}
						return {...newSection, products: sectionProducts}
					} else {
						return section
					}
				})

				state.isAdminActionLoading = false
			})
			.addCase(editProductsSection.rejected, (state, { payload }) => {
				const error = parseJSONError(payload as string)
				state.adminErrorMessage = error.message
				state.isAdminActionLoading = false
			})
	},
})

export default adminStore.reducer
