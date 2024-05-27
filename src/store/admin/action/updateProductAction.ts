import { createAsyncThunk } from '@reduxjs/toolkit'

import fetcher from '@/util/fetcher/fetcher'

import type { InsertOrUpdateAction, ProductAction } from '../admin.type'

const updateProductAction = createAsyncThunk<ProductAction, InsertOrUpdateAction>(
	'admin/update/action',
	async(actionData, thunkApi) => {
		try {
			return await fetcher.post<ProductAction>(`/admin/update/action`, undefined, actionData)
		} catch (error) {
			return thunkApi.rejectWithValue(error)
		}
	}
)

export default updateProductAction