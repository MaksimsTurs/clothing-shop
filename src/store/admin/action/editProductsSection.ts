import { createAsyncThunk } from '@reduxjs/toolkit'

import fetcher from '@/lib/fetcher/fetcher'

import { EditProductsSectionReturn, AddProductsSectionData } from '../admin.type'

const editProductsSection = createAsyncThunk<EditProductsSectionReturn, AddProductsSectionData>(
	'admin/product-section/edit',
	async(sectionData, thunkApi) => {
		try {
			const response = await fetcher.post<EditProductsSectionReturn>(`/admin/product-section/edit`, sectionData)
			return response
		} catch (error) {
			return thunkApi.rejectWithValue(error)
		}
	}
)

export default editProductsSection