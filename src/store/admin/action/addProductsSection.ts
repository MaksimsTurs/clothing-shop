import { createAsyncThunk } from '@reduxjs/toolkit'

import fetcher from '@/util/fetcher/fetcher'

import { ProductSection, ProductSectionAction } from '../admin.type'

const addProductsSection = createAsyncThunk<ProductSection, ProductSectionAction>(
	'admin/product-section/add',
	async(sectionData, thunkApi) => {
		try {
			const response = await fetcher.post<ProductSection>(`/admin/product-section/add`, undefined, sectionData)
			return response
		} catch (error) {
			return thunkApi.rejectWithValue(error)
		}
	}
)

export default addProductsSection