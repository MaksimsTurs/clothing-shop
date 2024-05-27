import { createAsyncThunk } from '@reduxjs/toolkit'

import fetcher from '@/util/fetcher/fetcher'

import type { InsertOrUpdateAction, ProductAction } from '../admin.type'

const insertProductAction = createAsyncThunk<ProductAction, InsertOrUpdateAction>(
	'admin/inser/action',
	async(sectionData, thunkApi) => {
		try {
			return await fetcher.post<ProductAction>(`/admin/insert/action`, undefined, sectionData)
		} catch (error) {
			return thunkApi.rejectWithValue(error)
		}
	}
)

export default insertProductAction