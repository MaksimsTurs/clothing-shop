import { createAsyncThunk } from '@reduxjs/toolkit'

import fetcher from '@/util/fetcher/fetcher'

import type { ProductData } from '../admin.type'

const updateProduct = createAsyncThunk<ProductData, FormData>(
	'admin/update/product',
	async(productData, thunkApi) => {
		try {
			return await fetcher.post<ProductData>(`/admin/update/product`, undefined, productData)
		} catch (error) {
			return thunkApi.rejectWithValue(error)
		}
	}
)

export default updateProduct