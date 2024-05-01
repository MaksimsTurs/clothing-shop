import { createAsyncThunk } from '@reduxjs/toolkit'

import fetcher from '@/util/fetcher/fetcher'

import type { ProductSection, ProductSectionAction } from '../admin.type'

const editProductsSection = createAsyncThunk<ProductSection, ProductSectionAction>(
	'admin/product-section/edit',
	async(sectionData, thunkApi) => {
		try {
			return await fetcher.post<ProductSection>(`/admin/product-section/edit`, undefined, sectionData)
		} catch (error) {
			return thunkApi.rejectWithValue(error)
		}
	}
)

export default editProductsSection