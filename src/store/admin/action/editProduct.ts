import { createAsyncThunk } from '@reduxjs/toolkit'

import fetcher from '@/util/fetcher/fetcher'

import type { EditProduct } from '../admin.type'

const editProduct = createAsyncThunk<EditProduct, FormData>(
	'admin/product/edit',
	async(productData, thunkApi) => {
		try {
			return await fetcher.post<EditProduct>(`/admin/product/edit`, undefined, productData)
		} catch (error) {
			return thunkApi.rejectWithValue(error)
		}
	}
)

export default editProduct