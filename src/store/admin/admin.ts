import { createSlice } from '@reduxjs/toolkit'

import type { AdminInitState, ProductData, ProductSection } from './admin.type'

import getStoreData from './action/getStoreData'
import removeItem from './action/removeItem'
import addProduct from './action/addProduct'
import addProductsSection from './action/addProductsSection'
import editUser from './action/editUser'
import editProduct from './action/editProduct'
import editProductsSection from './action/editProductsSection'

import parseJSONError from '@/lib/parseJSONError/parseJSONError'

import { isInclude, replaceByKey } from './tool/adminUtils'

import deleteFrom from './tool/deleteFrom'
import updateIn from './tool/updateIn'
import findFrom from './tool/findFrom'
import replaceFrom from './tool/replaceFrom'

const initialState: AdminInitState = {
	products: [],
	productsSection: [],
	users: [],
	order: [],
	isAdminActionLoading: false,
	adminActionError: undefined,
}

const adminStore = createSlice({
	name: 'admin',
	initialState,
	reducers: {},
	extraReducers(builder) {
/*--------------------------------------Get store data---------------------------------------------------*/
			builder.addCase(getStoreData.pending, (state) => {
				state.isAdminActionLoading = true
			})
			.addCase(getStoreData.fulfilled, (state, { payload }) => {
				const { products, productsSection, users } = payload

				state.products = products
				state.users = users
				state.productsSection = productsSection
				
				state.isAdminActionLoading = false
				state.adminActionError = undefined
			})
			.addCase(getStoreData.rejected, (state, { payload }) => {
				state.adminActionError = parseJSONError(payload as string)
				state.isAdminActionLoading = false
			})
/*--------------------------------------Get store data---------------------------------------------------*/
/*--------------------------------------Remove Item------------------------------------------------------*/
			.addCase(removeItem.pending, (state) => {
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
							products: deleteFrom<ProductData>({ _id: id }, section.products) 
						}))
					break;
					case 'product-section':
						state.productsSection = deleteFrom<ProductSection>({ _id: id }, state.productsSection)!
						state.products = updateIn<ProductData>({ sectionID: id }, { category: '', sectionID: '', precent: null }, state.products)
					break;
				}

				state.isAdminActionLoading = false
				state.adminActionError = undefined
			})
			.addCase(removeItem.rejected, (state, { payload }) => {
				state.adminActionError = parseJSONError(payload as string)
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
				state.adminActionError = parseJSONError(payload as string)
				state.isAdminActionLoading = false
			})
/*--------------------------------------Add product------------------------------------------------------*/
/*-------------------------------------Edit product------------------------------------------------------*/
			.addCase(editProduct.pending, state => {
				state.isAdminActionLoading = true
			})
			.addCase(editProduct.fulfilled, (state, { payload }) => {
				const { updatedProduct, updatedProductsSection } = payload

				//1) Replace product from products with new product.
				state.products = replaceFrom<ProductData>({ _id: updatedProduct._id }, state.products, updatedProduct)

				//2) Replace/Push product from section products.
				if(updatedProductsSection) {
					state.productsSection = state.productsSection.map(section => {
						if(section._id === updatedProductsSection._id) {
							const include: boolean = isInclude(updatedProductsSection.productsID, updatedProduct._id)
							return {
								...section, 
								productsID: include ? section.productsID : [...section.productsID, updatedProduct._id], 
								products: include ? replaceByKey('_id', section.products!, updatedProduct) : [...section.products || [], updatedProduct]	
							}
						}
						return section
					})
				}

				state.isAdminActionLoading = false
				state.adminActionError = undefined
			})
			.addCase(editProduct.rejected, (state, { payload }) => {
				state.adminActionError = parseJSONError(payload as string)
				state.isAdminActionLoading = false
			})
/*-------------------------------------Edit product------------------------------------------------------*/
/*-------------------------------------Add product section-----------------------------------------------*/
			.addCase(addProductsSection.pending, state => {
				state.isAdminActionLoading = true
			})
			.addCase(addProductsSection.fulfilled, (state, { payload }) => {
				const { newSection } = payload
				
				//1) Insert products into new Section
				let products: ProductData[] = []

				for(let index: number = 0; index < state.products.length; index++) {
					const currProduct = state.products[index]
					if(isInclude(newSection.productsID, currProduct._id)) {
						const updatedProduct = {...currProduct, precent: newSection.precent, sectionID: newSection._id, category: newSection.title }

						products = [...products, updatedProduct]
						state.products[index] = updatedProduct
					}
				}

				state.productsSection = [...state.productsSection, {...newSection, products }]

				state.isAdminActionLoading = false
				state.adminActionError = undefined
			})
		  .addCase(addProductsSection.rejected, (state, { payload }) => {
				state.adminActionError = parseJSONError(payload as string)
				state.isAdminActionLoading = false
			})
/*-------------------------------------Add product section-----------------------------------------------*/
/*-------------------------------------Edit user---------------------------------------------------------*/
			.addCase(editUser.pending, state => {
				state.isAdminActionLoading = true
			})
			.addCase(editUser.fulfilled, (state, { payload }) => {
				state.users = replaceByKey('_id', state.users, payload)

				state.isAdminActionLoading = false
				state.adminActionError = undefined
			})
			.addCase(editUser.rejected, (state, { payload }) => {
				state.adminActionError = parseJSONError(payload as string)
				state.isAdminActionLoading = false
			})
/*-------------------------------------Edit user---------------------------------------------------------*/
/*-------------------------------------Edit product section----------------------------------------------*/
			.addCase(editProductsSection.pending, (state) => {
				state.isAdminActionLoading = true
			})
			.addCase(editProductsSection.fulfilled, (state, { payload }) => {
				const { updatedProductsSection } = payload

				let sectionProducts: ProductData[] = []

				//1) Update all products in section
				state.productsSection = state.productsSection.map(section => {
					if(section._id === updatedProductsSection._id) {
						for(let index: number = 0; index < state.products.length; index++) {
							const currProduct = state.products[index]
							if(updatedProductsSection.productsID.includes(currProduct._id)) sectionProducts = [...sectionProducts, {...currProduct, sectionID: section._id, precent: updatedProductsSection.precent, category: updatedProductsSection.title }]
						}
						return {...updatedProductsSection, products: sectionProducts }
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
				state.adminActionError = parseJSONError(payload as string)
				state.isAdminActionLoading = false
			})
/*-------------------------------------Edit product section----------------------------------------------*/
	},
})

export default adminStore.reducer