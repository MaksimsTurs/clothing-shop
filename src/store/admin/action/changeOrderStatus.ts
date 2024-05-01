import { createAsyncThunk } from '@reduxjs/toolkit'

import fetcher from '@/util/fetcher/fetcher'

import type { ChangeOrderStatus } from '../admin.type'

const changeOrderStatus = createAsyncThunk<ChangeOrderStatus, ChangeOrderStatus>(
	'admin/order/change-status',
	async(statusData, thunkApi) => {
		try {
			return await fetcher.post<ChangeOrderStatus>(`/admin/order/change-status`, undefined, statusData)
		} catch (error) {
			return thunkApi.rejectWithValue(error)
		}
	}
)

export default changeOrderStatus