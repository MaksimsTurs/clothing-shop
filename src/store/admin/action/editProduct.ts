import { createAsyncThunk } from '@reduxjs/toolkit'

import fetcher from '@/lib/fetcher/fetcher'

import type { EditProduct } from '../admin.type'

const editProduct = createAsyncThunk<EditProduct, FormData>(
	'admin/product/edit',
	async(productData, thunkApi) => {
		try {
			const response = await fetcher.post<EditProduct>(`/admin/product/edit`, productData)
			return response
		} catch (error) {
			return thunkApi.rejectWithValue(error)
		}
	}
)

export default editProduct